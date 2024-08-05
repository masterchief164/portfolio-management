# Portfolio management backend

## Description

This is a backend for a portfolio management system. It is built using Flask.

## Installation

1. Clone the repository
2. Install the dependencies using `pip install -r requirements.txt`
3. Run the application using `python app.py`

## Using with docker

1. use the following command to run the application using docker compose

```bash 
docker-compose -f docker-compose.yml up --build
```

2. The application will be running on `http://localhost:8080`

## Guidelines

1. Use the following command to add the requirements to the requirements.txt file

```bash
pip freeze > requirements.txt
```

`Note: Do not forget to activate the virtual environment before running the above command`

2. Use the following command activate the virtual environment

```bash
source venv/bin/activate
```