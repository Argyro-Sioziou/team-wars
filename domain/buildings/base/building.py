import math

"""
    Base class for all building types in the game, providing common functionality 
    for managing building levels, costs, and unlock states.

    Attributes:
        level (int): Current level of the building, initialized to 1 by default.
        base_cost (int): Base cost in gold for the first upgrade (to level 2).
        growth_factor (float): Factor by which the upgrade cost increases with each level.
        max_level (int): Maximum level the building can achieve.
        locked (bool): Indicates whether the building is locked and cannot be upgraded.
    
    Constants:
        DEFAULT_BASE_COST (int): Default base cost for buildings.
        DEFAULT_GROWTH_FACTOR (float): Default growth factor for cost increases.
        MAX_LEVEL (int): Default maximum level for buildings.

    Methods:
        __init__(base_cost=DEFAULT_BASE_COST, growth_factor=DEFAULT_GROWTH_FACTOR, level=1, locked=False, max_level=MAX_LEVEL):
            Initializes the building with specified attributes, setting initial costs and states.

        unlock():
            Unlocks the building, allowing it to be upgraded.

        calculate_upgrade_cost() -> int:
            Calculates and returns the cost to upgrade the building to the next level.

        upgrade() -> int:
            Increases the building's level if it has not reached the maximum level and returns the new level.

        to_dict() -> dict:
            Returns a dictionary with the current attributes of the building, including level and locked status.
"""

class Building:
    DEFAULT_BASE_COST = 1000
    DEFAULT_GROWTH_FACTOR = 1.8
    MAX_LEVEL = 10

    def __init__(self, base_cost=DEFAULT_BASE_COST, growth_factor=DEFAULT_GROWTH_FACTOR, level=1, locked=True, max_level=MAX_LEVEL):
        self.level = level
        self.base_cost = base_cost  # Base cost for the first upgrade
        self.growth_factor = growth_factor
        self.max_level = max_level
        self.locked = locked
        self.upgrade_cost = self.calculate_upgrade_cost()
        self.position = None

    def build(self, position):
        self.position = position

    def unlock(self):
        self.locked = False

    def calculate_upgrade_cost(self):
        return math.ceil(self.base_cost * (self.growth_factor ** (self.level - 1)))

    def upgrade(self):
        if self.level >= self.max_level:
            raise Exception("Building is at max level.")

        print(f"Upgrading from Level {self.level} to Level {self.level + 1}. Cost: {self.upgrade_cost} gold.")

        self.level += 1

        self.upgrade_cost = self.calculate_upgrade_cost()

        return self.level

    def to_dict(self):
        return {
            "level": self.level,
            "locked": self.locked,
        }

    