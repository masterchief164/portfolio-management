FROM python:3.10-alpine
LABEL authors="shaswat"

COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 80
CMD ["gunicorn", "--bind", "0.0.0.0:80", "app:app"]
