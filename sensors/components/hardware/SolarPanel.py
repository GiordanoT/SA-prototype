import random


class SolarPanel:
    @staticmethod
    def simulate(client, user, index, light):
        url = f'users/{user}/solarPanels/{index}/'
        value = round(light * 0.5 + random.randint(0, 10))
        if value > 100:
            value = 100
        if value < 0:
            value = 0
        client.publish(url + 'value', value)
        return value

