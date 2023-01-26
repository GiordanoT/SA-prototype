from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore
import time
import uuid


login = credentials.Certificate("./key.json")
firebase_admin.initialize_app(login)
db = firestore.client()


def generate_id(string_length=20):
    random = str(uuid.uuid4())
    random = random.upper()
    random = random.replace("-", "")
    return random[0:string_length]


def main():
    while True:
        users = db.collection('users').stream()
        for user_raw in users:
            user = user_raw.to_dict()
            id = user.get('id')
            devices = db.collection('devices').where('user', '==', id).where('active', '==', True).stream()
            consumptions = 0
            for device_raw in devices:
                device = device_raw.to_dict()
                consumptions += round(device['energy'] / 60)
            firebase_db = db.collection('consumptions')
            document_id = generate_id()
            firebase_db.document(document_id).set({
                'value': consumptions,
                'user': id,
                'timestamp': datetime.now(),
                'id': document_id
            })
        time.sleep(60)


if __name__ == '__main__':
    main()

