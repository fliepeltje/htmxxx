FROM python:3.11-slim-bookworm

RUN python -m pip install markdown2 jinja2 jsmin fastapi
WORKDIR /builder
COPY app.py .

CMD ["python", "app.py"]