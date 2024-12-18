# Automatic Number Plate Detection

## Project Overview

This project involves developing an **Automatic Number Plate Detection** system. The system consists of two main components: a **frontend** for user interaction and a **backend** for processing and object detection. The frontend is built using **React**, **Shadcn UI**, and **Tailwind CSS**, while the backend uses **Flask** and **Python**. The detection is powered by **YOLOv8**, a state-of-the-art object detection model, trained on a custom number plate dataset. The system also uses **EasyOCR** to extract vehicle numbers from the detected plates.

## Prerequisites

Ensure that the following software and tools are installed before replicating the solution:

- **Docker**: For containerizing the application.
- **Python**: For backend services (Flask).
- **Docker Compose**: For orchestrating Docker containers.
- **React**: For frontend development.
- **YOLOv8**: Pretrained object detection model for number plate detection.
- **EasyOCR**: Optical character recognition library for extracting vehicle numbers.
- **Shadcn UI**: For UI components.
- **Tailwind CSS**: For styling the UI.

## Architecture

The system has two main parts:

1. **Frontend**:
    - Built using **React**, **Shadcn UI**, and **Tailwind CSS** to provide a dynamic and responsive UI.
    - Allows users to upload images and view results with bounding boxes and recognized vehicle numbers.

2. **Backend**:
    - Built using **Flask** and **Python** to handle image processing.
    - Processes the uploaded images with **YOLOv8** for object detection and uses **EasyOCR** to extract vehicle numbers from the detected plates.

## Model Details

The **YOLOv8** model is trained on a custom dataset specifically for number plate detection. The dataset consists of approximately 8000 images, which were preprocessed and augmented for better model performance. The annotations were created using **Roboflow** to ensure accurate plate detection.

Key features include:
- **Custom Dataset**: A manually curated dataset with annotated bounding boxes for number plates.
- **SAHI Technique**: Used to enhance detection accuracy for small or distant plates.
- **Image Preprocessing and Augmentation**: Includes resizing, flipping, and color adjustments to improve model generalization.

## How It Works

### Frontend Interaction:
1. The user uploads an image through the React frontend.
2. The image is sent to the backend Flask API for processing.

### Backend Processing:
1. The Flask backend receives the image and passes it to the YOLOv8 model for object detection.
2. YOLOv8 detects the number plates and provides bounding box coordinates.

### OCR Extraction:
1. EasyOCR is used to extract the vehicle number from the detected number plates.

### Result Return:
1. The backend returns the detected number plate’s coordinates and the recognized vehicle number in a structured JSON format.
2. The frontend displays the image with bounding boxes and the corresponding vehicle number.

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/jvishwa06/AdvancedLicensePlateDetection.git
    cd AdvancedLicensePlateDetection
    ```

2. Navigate to the root directory and build the Docker container:
    ```bash
    docker-compose up --build
    ```

3. The system will run locally, and you can access it through your browser.

## Example JSON Output

After processing an image, the frontend displays the number plate with bounding boxes. The result is also available in a structured JSON format, for example:

```json
{
  "number_plate": {
    "vehicle_number": "ABC1234",
    "bounding_box": {
      "x1": 120,
      "y1": 80,
      "x2": 400,
      "y2": 120
    }
  }
}
