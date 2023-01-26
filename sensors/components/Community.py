import time
import requests
import json


class Community:
    def __init__(self):
        my_time = time.localtime()
        if my_time.tm_hour < 6 or my_time.tm_hour > 18:
            day = 0
        else:
            day = 1
        try:
            query = 'https://api.open-meteo.com/v1/forecast?latitude=45.59&longitude=9.57&current_weather=true'
            weather_raw = requests.get(query).content
            weather = json.loads(weather_raw)['current_weather']
            weather_code = weather['weathercode']
            self.wind_speed = weather['windspeed']
            self.temperature = weather['temperature']
            if day:
                self.light = round(((100 - weather_code) * (self.temperature + 1)) / 10)
            else:
                self.light = 0
        except:
            self.wind_speed = 0
            self.temperature = 0
            self.light = 0
