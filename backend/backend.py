from flask import Flask, request, jsonify, send_from_directory
import os
import cv2
from ultralytics import YOLO
import easyocr

reader = easyocr.Reader(['en'], gpu=True)

app = Flask(__name__)

OUTPUT_DIR = "outputs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def perform_ocr_on_image(img, coordinates):
    x1, y1, x2, y2 = map(int, coordinates)
    cropped_img = img[y1:y2, x1:x2]
    gray_img = cv2.cvtColor(cropped_img, cv2.COLOR_RGB2GRAY)
    results = reader.readtext(gray_img)

    if results:
        best_result = max(results, key=lambda x: x[2])  
        return best_result[1] if best_result[2] > 0.2 else ""
    return ""

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/outputs/<path:filename>')
def serve_output(filename):
    return send_from_directory(OUTPUT_DIR, filename)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    model = YOLO("models/best.pt")

    file = request.files['file']
    input_path = os.path.join(OUTPUT_DIR, file.filename)
    file.save(input_path)

    img = cv2.imread(input_path)
    results = model.predict(img, imgsz=640, conf=0.25)

    annotations = []
    annotated_img = img.copy()
    for result in results:
        for box in result.boxes:
            xyxy = box.xyxy[0].cpu().numpy()  
            conf = box.conf[0].item()         
            cls = box.cls[0].item()          
            label = result.names[int(cls)]   

            text_ocr = perform_ocr_on_image(img, xyxy)

            x1, y1, x2, y2 = map(int, xyxy)
            cv2.rectangle(annotated_img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(annotated_img, f"{text_ocr}", (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            annotations.append({
                "bbox": [x1, y1, x2, y2],
                "confidence": conf,
                "class": label,
                "ocr_text": text_ocr
            })

    annotated_path = os.path.join(OUTPUT_DIR, f"{os.path.splitext(file.filename)[0]}_annotated.jpg")
    cv2.imwrite(annotated_path, annotated_img)

    return jsonify({
        "results": annotations,
        "annotated_image_path": f"/outputs/{os.path.basename(annotated_path)}"
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
