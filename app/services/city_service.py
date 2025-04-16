from domain.city import City
from domain.buildings.exceptions import CityNotFoundError

class CityService:
    def __init__(self):
        self._cities = []  # In-memory storage, will be replaced with DB later

    def create_city(self, name: str, icon: str):
        city = City(name, icon)
        self._cities.append(city)
        return city

    def get_all_cities(self):
        return self._cities

    def get_city_by_id(self, city_id):
        city = next((city for city in self._cities if city.id == city_id), None)
        if not city:
            raise CityNotFoundError("City not found")
        return city

    def upgrade_building(self, city_id, building_name):
        city = self.get_city_by_id(city_id)
        building = city.get_building(building_name)
        city.upgrade_building(building)
        return city 