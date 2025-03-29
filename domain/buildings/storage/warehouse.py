from domain.buildings.base.building import Building

class Warehouse(Building):
    BASE_FOOD_CAPACITY = 50
    ADDED_FOOD_PER_LEVEL = 50
    BASE_COST = 500
    GROWTH_FACTOR = 1.6

    """
    Warehouse building that stores food and manages resource limits for units and weapons.

    Attributes:
        level (int): Current level of the Warehouse, initialized to 1 by default.
        food_capacity (int): Maximum amount of food the Warehouse can store, increasing with each level.

    Constants:
        BASE_FOOD_CAPACITY (int): Initial food storage capacity at level 1.
        ADDED_FOOD_PER_LEVEL (int): Additional food capacity gained per level.
        BASE_COST (int): Initial cost to build the Warehouse.
        GROWTH_FACTOR (float): Multiplier applied to upgrade costs with each level.

    Methods:
        __init__(level=1):
            Initializes the Warehouse at the specified level and sets initial food capacity.

        calculate_food_capacity() -> int:
            Calculates and returns the food capacity based on the current level.

        to_dict() -> dict:
            Returns a dictionary with the Warehouse's current attributes, including food capacity.
    """

    def __init__(self, level=1):
        super().__init__(self.BASE_COST, self.GROWTH_FACTOR, level)
        self.food_capacity = self.calculate_food_capacity()

    def calculate_food_capacity(self):
        return self.BASE_FOOD_CAPACITY + (self.level - 1) * self.ADDED_FOOD_PER_LEVEL

    def upgrade(self):
        super().upgrade()
        self.food_capacity = self.calculate_food_capacity()

    def to_dict(self):
        building_dict = super().to_dict()
        building_dict["food_capacity"] = self.food_capacity
        return building_dict
