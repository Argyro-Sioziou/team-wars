# from atlassian import Jira
from pprint import pprint
# from jira_api_key import API_KEY
from domain.city import City
from domain.buildings.exceptions import (
    CityError,
    InsufficientGoldError,
    BuildingLockedError,
    BuildingLevelError,
    InvalidBuildingError
)

def test_city_operations():
    print("Starting city operations test...")
    
    # Initialize city
    city = City(gold=2000)
    print(f"Created new city with {city.gold} gold")

    # Try to upgrade locked building
    try:
        print("\nTrying to upgrade locked workshop...")
        city.upgrade_building(city.workshop)
    except BuildingLockedError as e:
        print(f"Expected error (locked): {e}")
    except InsufficientGoldError as e:
        print(f"Expected error (gold): {e}")
    except BuildingLevelError as e:
        print(f"Expected error (level): {e}")

    # Unlock and upgrade castle
    print("\nUnlocking and upgrading castle...")
    city.unlock_building(city.castle)
    city.upgrade_building(city.castle)
    print(f"Castle level: {city.castle.level}")
    print(f"Remaining gold: {city.gold}")

    # Try getting building by name
    print("\nTesting get_building method...")
    castle = city.get_building("castle")
    print(f"Retrieved castle level: {castle.level}")

    try:
        print("Trying to get invalid building...")
        city.get_building("invalid_building")
    except InvalidBuildingError as e:
        print(f"Expected error (invalid building): {e}")

    # Test resource management
    print("\nTesting gold management...")
    city.add_gold(500)
    print(f"Added 500 gold. New balance: {city.gold}")

    try:
        print("Trying to spend more gold than available...")
        city.spend_gold(5000)
    except InsufficientGoldError as e:
        print(f"Expected error (insufficient gold): {e}")

    # Test building upgrade requirements
    print("\nTesting building upgrade requirements...")
    try:
        city.can_upgrade_building(city.blacksmith)
        print("Can upgrade blacksmith")
    except CityError as e:
        print(f"Cannot upgrade blacksmith: {e}")

    # Convert city to dictionary and print structure
    print("\nCity data structure:")
    city_data = city.to_dict()
    print(f"City ID: {city_data['id']}")
    print(f"Gold: {city_data['gold']}")
    print("Buildings:")
    for building in city_data['buildings']:
        print(f"- {building['name']} (Level {building['level']}, {'Unlocked' if not building['locked'] else 'Locked'})")

test_city_operations()

jira = Jira(
    url='https://teamfights.atlassian.net/',
    username='kostasdemiris@gmail.com',
    password=API_KEY,
    cloud=True)




#  get project
project_key = "TM3"
jql_request = jira.get_project(key=project_key, expand=None)
# pprint(jql_request)

#
jql = 'project = {v1} AND status = "To Do"'.format(v1=project_key)
jql_request = jira.get_issues_for_board(board_id=3, jql=jql, fields="*all", start=0, limit=None, expand=None)
story_points_fields = 'customfield_10036'
story_points_list = []
for issue in jql_request['issues']:
    # pprint(issue['fields'][story_points_fields])
    issue_story_point = issue['fields'][story_points_fields]
    story_points_list.append(issue_story_point)

pprint(sum(story_points_list))
