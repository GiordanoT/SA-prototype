FROM python:3.11
WORKDIR /app
COPY . .
RUN pip3 install paho-mqtt
RUN pip3 install requests
RUN pip3 install firebase-admin
CMD ["python3", "main.py"]