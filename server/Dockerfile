FROM python:3.10

ENV PYTHONUNBUFFERED=1

RUN apt update

WORKDIR /app/server

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .