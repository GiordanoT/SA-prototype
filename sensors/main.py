import time
import firebase_admin
from firebase_admin import credentials, firestore
import paho.mqtt.client as mqtt
from components.Community import Community
from components.hardware.SolarPanel import SolarPanel
from components.hardware.WindTurbine import WindTurbine


def main():
    client = mqtt.Client("ID1")
    client.on_publish = lambda client, userdata, mid: print("PUBLISH: ", mid)
    connected = False
    ip = "mosquitto"
    while not connected:
        try:
            if client.connect(ip) == 0:
                connected = True
        except:
            print("Connection failed")
            time.sleep(5)

    login = credentials.Certificate("./key.json")
    firebase_admin.initialize_app(login)
    db = firestore.client()
    while True:
        community = Community()
        users = db.collection("users").stream()
        for raw in users:
            user = raw.to_dict()
            id = user.get('id')
            solar_panels = user.get('solarPanels')
            productions = 0
            for index in range(0, solar_panels):
                productions += SolarPanel.simulate(client, id, index, community.light)

            wind_turbines = user.get('windTurbines')
            for index in range(0, wind_turbines):
                productions += WindTurbine.simulate(client, id, index, community.wind_speed)
            url = f'users/{id}/productions/value'
            client.publish(url, productions)
        time.sleep(60)


if __name__ == '__main__':
    main()
