FROM python:3.10-alpine
LABEL authors="shaswat"

COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["python", "./src/app.py"]
