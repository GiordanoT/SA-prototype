import time
import datetime
import mysql.connector
import firebase_admin
from firebase_admin import credentials, firestore

user = 'root'
password = 'root'
ip = '172.20.0.105'
db_name = 'energy_community'
connected = False
while not connected:
    try:
        db_mysql = mysql.connector.connect(user=user, password=password, host=ip, database=db_name)
        connected = True
    except:
        print('Connecting...')
        time.sleep(10)

login = credentials.Certificate("./key.json")
firebase_admin.initialize_app(login)
db_firebase = firestore.client()

minutes = 20


def to_string(list):
    my_str = ",".join(str(x) for x in list)
    return my_str


def write(cursor, table, columns, val):
    if table == 'solar_panels' or table == 'wind_turbines':
        sql = f'INSERT INTO {table} ({to_string(columns)}) VALUES (%s, %s, %s, %s)'
    else:
        sql = f'INSERT INTO {table} ({to_string(columns)}) VALUES (%s, %s, %s)'
    cursor.execute(sql, val)
    db_mysql.commit()
    print('Writing into the DB...')


def write_solar_panels(cursor):
    date = datetime.datetime.now() - datetime.timedelta(minutes=minutes)
    solar_panels = db_firebase.collection('solarPanels').where('timestamp', '<=', date).stream()
    for raw in solar_panels:
        solar_panel = raw.to_dict()
        id = solar_panel['id']
        timestamp = solar_panel['timestamp']
        timestamp += datetime.timedelta(minutes=60)
        user = solar_panel['user']
        code = solar_panel['number']
        value = solar_panel['value']
        val = (timestamp, user, code, value)
        write(cursor, 'solar_panels', ['timestamp', 'user', 'code', 'value'], val)
        db_firebase.collection('solarPanels').document(id).delete()


def write_wind_turbines(cursor):
    date = datetime.datetime.now() - datetime.timedelta(minutes=minutes)
    wind_turbines = db_firebase.collection('windTurbines').where('timestamp', '<=', date).stream()
    for raw in wind_turbines:
        wind_turbine = raw.to_dict()
        id = wind_turbine['id']
        timestamp = wind_turbine['timestamp']
        timestamp += datetime.timedelta(minutes=60)
        user = wind_turbine['user']
        code = wind_turbine['number']
        value = wind_turbine['value']
        val = (timestamp, user, code, value)
        write(cursor, 'wind_turbines', ['timestamp', 'user', 'code', 'value'], val)
        db_firebase.collection('windTurbines').document(id).delete()


def write_productions(cursor):
    date = datetime.datetime.now() - datetime.timedelta(minutes=minutes)
    productions = db_firebase.collection('productions').where('timestamp', '<=', date).stream()
    for raw in productions:
        production = raw.to_dict()
        id = production['id']
        timestamp = production['timestamp']
        timestamp += datetime.timedelta(minutes=60)
        user = production['user']
        value = production['value']
        val = (timestamp, user, value)
        write(cursor, 'productions', ['timestamp', 'user', 'value'], val)
        db_firebase.collection('productions').document(id).delete()


def write_consumptions(cursor):
    date = datetime.datetime.now() - datetime.timedelta(minutes=minutes)
    consumptions = db_firebase.collection('consumptions').where('timestamp', '<=', date).stream()
    for raw in consumptions:
        consumption = raw.to_dict()
        id = consumption['id']
        timestamp = consumption['timestamp']
        timestamp += datetime.timedelta(minutes=60)
        user = consumption['user']
        value = consumption['value']
        val = (timestamp, user, value)
        write(cursor, 'consumptions', ['timestamp', 'user', 'value'], val)
        db_firebase.collection('consumptions').document(id).delete()


def main():
    while True:
        cursor = db_mysql.cursor()
        write_solar_panels(cursor)
        write_wind_turbines(cursor)
        write_productions(cursor)
        write_consumptions(cursor)
        cursor.close()
        time.sleep(3600)


if __name__ == '__main__':
    main()

