import random


class WindTurbine:
    @staticmethod
    def simulate(client, user, index, speed):
        url = f'users/{user}/windTurbines/{index}/'
        value = round(speed * 5 + random.randint(0, 10))
        if value > 100:
            value = 100
        if value < 0:
            value = 0
        client.publish(url + 'value', value)
        return value
