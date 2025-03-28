# Base Image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    build-essential \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy project files (excluding entrypoint for now)
COPY media/ /app/media/
COPY . .

# Copy entrypoint last to avoid being overwritten
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Entrypoint will handle DB wait + migrations + static collection
ENTRYPOINT ["/entrypoint.sh"]

# Required by Cloud Run
EXPOSE 8080

# Run Gunicorn
CMD ["gunicorn", "social_book.wsgi:application", "--bind", "0.0.0.0:8080"]
