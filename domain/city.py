from domain.buildings.military.barracks import Barracks
from domain.buildings.production.blacksmith import Blacksmith
from domain.buildings.production.workshop import Workshop
from domain.buildings.military.castle import Castle
from domain.buildings.defense.citywalls import CityWalls
from domain.buildings.storage.warehouse import Warehouse
from domain.buildings.exceptions import (
    InsufficientGoldError,
    BuildingLockedError,
    BuildingLevelError,
    InvalidBuildingError
)
from typing import Union, Dict, List, TypeAlias
import uuid

"""
    Represents a city with various buildings that can be upgraded and unlocked.

    Attributes:
        castle (Castle): The main command center of the city, responsible for upgrades and levels.
        city_walls (CityWalls): Defensive structures that protect the city from attacks.
        barracks (Barracks): Military building that trains and maintains troops.
        blacksmith (Blacksmith): Building that produces weapons and upgrades for units.
        workshop (Workshop): Facility for constructing advanced mechanical units and siege engines.
        warehouse (Warehouse): Structure that stores food and manages resource limits.

    Methods:
        __init__():
            Initializes the city with default buildings.
        
        unlock_building(building):
            Unlocks a specified building, allowing it to be upgraded.

        upgrade_building(building):
            Upgrades a specified building if it meets the required conditions.
"""

BuildingType: TypeAlias = Union[Castle, CityWalls, Barracks, Blacksmith, Workshop, Warehouse]

class City:
    def __init__(self, gold: int = 10000) -> None:
        """Initialize a new city with buildings and starting gold.

        Args:
            gold (int, optional): Starting gold amount. Defaults to 10000.

        Raises:
            ValueError: If gold amount is negative.
        """
        if gold < 0:
            raise ValueError("Starting gold cannot be negative")
            
        self.id = str(uuid.uuid4())
        self.gold = gold
        
        # Initialize buildings
        self.castle = Castle()  # Starts unlocked by default
        self.city_walls = CityWalls()
        self.barracks = Barracks()
        self.blacksmith = Blacksmith()
        self.workshop = Workshop()
        self.warehouse = Warehouse()

    def unlock_building(self, building: BuildingType) -> None:
        """Unlock a building to allow upgrades.

        Args:
            building: The building instance to unlock.
        """
        building.unlock()

    def can_upgrade_building(self, building: BuildingType) -> None:
        """Check if a building can be upgraded without attempting the upgrade.

        Args:
            building: The building instance to check.

        Raises:
            BuildingLockedError: If the building is locked
            InsufficientGoldError: If there isn't enough gold
            BuildingLevelError: If castle level requirement isn't met
        """

        if not self.has_enough_gold(building.upgrade_cost):
            raise InsufficientGoldError(
                f"Need {building.upgrade_cost} gold to upgrade {building.__class__.__name__}"
            )

        if not isinstance(building, Castle) and building.level == self.castle.level:
            raise BuildingLevelError(
                f"Castle must be upgraded to level {building.level + 1} to upgrade {building.__class__.__name__}"
            )
        
        if building.locked:
            building.unlock()

    def upgrade_building(self, building: BuildingType) -> None:
        """Upgrade a building if requirements are met.

        Args:
            building: The building instance to upgrade.

        Raises:
            BuildingLockedError: If the building is locked
            InsufficientGoldError: If there isn't enough gold
            BuildingLevelError: If castle level requirement isn't met
        """
        self.can_upgrade_building(building)
        building.upgrade()
        self.spend_gold(building.upgrade_cost)

        match building:
            case Blacksmith():
                if building.level == 5:
                    self.unlock_building(self.workshop)

    def get_building(self, building_name: str) -> BuildingType:
        """Get a building instance by its name."""
        valid_buildings = {
            'castle': self.castle,
            'city_walls': self.city_walls,
            'barracks': self.barracks,
            'blacksmith': self.blacksmith,
            'workshop': self.workshop,
            'warehouse': self.warehouse
        }

        if building_name not in valid_buildings:
            raise InvalidBuildingError(
                f"Invalid building name: '{building_name}'. "
                f"Must be one of: {', '.join(valid_buildings.keys())}"
            )

        return valid_buildings[building_name]

    @property
    def all_buildings(self) -> Dict[str, BuildingType]:
        """Get a dictionary of all buildings in the city.

        Returns:
            dict: Dictionary mapping building names to their instances.
        """
        return {
            "castle": self.castle,
            "city_walls": self.city_walls,
            "barracks": self.barracks,
            "blacksmith": self.blacksmith,
            "workshop": self.workshop,
            "warehouse": self.warehouse
        }

    def building_to_dict(self, name: str, building: BuildingType) -> dict:
        """Convert a building instance to a dictionary representation.

        Args:
            name (str): Name of the building.
            building: Building instance to convert.

        Returns:
            dict: Dictionary containing building information.
        """
        building_dict = vars(building)  # Get all instance variables
        return {
            "name": name,
            "type": building.__class__.__name__,
            "level": building_dict.get('level', 0),
            "locked": building_dict.get('locked', True),
            "upgrade_cost": building_dict.get('upgrade_cost', 0),
            # Add any other specific properties you want to include
        }

    def to_dict(self) -> Dict[str, Union[str, int, List[Dict[str, Union[str, int, bool]]]]]:
        """Convert the city and all its buildings to a dictionary representation.

        Returns:
            dict: Dictionary containing all city information.
        """
        return {
            "id": self.id,
            "gold": self.gold,
            "buildings": [
                self.building_to_dict(name, building)
                for name, building in self.all_buildings.items()
            ]
        }

    def add_gold(self, amount: int) -> None:
        """Add gold to the city's treasury.

        Args:
            amount (int): Amount of gold to add.

        Raises:
            ValueError: If amount is negative.
        """
        if amount < 0:
            raise ValueError("Cannot add negative amount of gold")
        self.gold += amount

    def spend_gold(self, amount: int) -> None:
        """Spend gold from the city's treasury.

        Args:
            amount (int): Amount of gold to spend.

        Raises:
            ValueError: If amount is negative
            InsufficientGoldError: If there isn't enough gold available
        """
        if amount < 0:
            raise ValueError("Cannot spend negative amount of gold")
        if amount > self.gold:
            raise InsufficientGoldError(f"Not enough gold. Have: {self.gold}, Need: {amount}")
        self.gold -= amount

    def has_enough_gold(self, amount: int) -> bool:
        """Check if the city has enough gold.

        Args:
            amount (int): Amount of gold to check for.

        Returns:
            bool: True if the city has enough gold, False otherwise.
        """
        return self.gold >= amount