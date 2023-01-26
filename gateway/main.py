from datetime import datetime
import paho.mqtt.client as mqtt
import time
import firebase_admin
from firebase_admin import credentials, firestore
import uuid

login = credentials.Certificate("./key.json")
firebase_admin.initialize_app(login)
db = firestore.client()


def generate_id(string_length=20):
    random = str(uuid.uuid4())
    random = random.upper()
    random = random.replace("-", "")
    return random[0:string_length]


def subscribe(msg):
    topic = msg.topic
    array = topic.split('/')
    user, sensor = int(array[1]), array[2]
    value = str(msg.payload.decode('utf-8'))
    timestamp = datetime.now()
    firebase_db = db.collection(sensor)
    id = generate_id()
    if sensor != 'productions':
        index = int(array[3])
        firebase_db.document(id).set({
            'timestamp': timestamp,
            'value': int(value),
            'user': user,
            'number': index,
            'id': id
        })
    else:
        firebase_db.document(id).set({
            'timestamp': timestamp,
            'value': int(value),
            'user': user,
            'id': id
        })
    print(f'PUBLISH {timestamp}')


def main():
    client = mqtt.Client("ID2")
    client.on_message = lambda client, userdata, msg: subscribe(msg)
    connected = False
    ip = "mosquitto"
    while not connected:
        try:
            if client.connect(ip) == 0:
                connected = True
        except:
            print("Connection failed")
            time.sleep(5)
    client.subscribe(f"users/#")
    client.loop_forever()


if __name__ == '__main__':
    main()

