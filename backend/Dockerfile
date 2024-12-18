FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY backend.py ./
COPY models/ ./models/ 
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt


EXPOSE 5000

CMD ["python", "backend.py"]
