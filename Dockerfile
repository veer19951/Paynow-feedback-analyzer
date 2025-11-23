# 1. Use an official Python base image
FROM python:3.10-slim

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy dependencies list and install them first (for faster builds)
# The dependencies are listed in the requirements.txt file.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy the rest of the application code
COPY . .

# 5. Define the command to run the application
# Cloud Run provides the port via the $PORT environment variable.
CMD ["streamlit", "run", "app.py", "--server.port", "$PORT", "--server.address", "0.0.0.0"]
