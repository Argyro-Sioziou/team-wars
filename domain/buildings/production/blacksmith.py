from domain.buildings.base.building import Building

class Blacksmith(Building):
    BASE_COST = 600
    GROWTH_FACTOR = 1.65
    ADDED_SPEED_PER_LEVEL = 0.05

    """
    Blacksmith building that produces weapons and increases production speed with each upgrade.

    Attributes:
        level (int): Current level of the Blacksmith, defaulting to 1.
        production_speed (int): Current production speed, calculated based on level and ADDED_SPEED_PER_LEVEL.
    
    Constants:
        BASE_COST (int): Initial cost to build the Blacksmith.
        GROWTH_FACTOR (float): Factor by which upgrade costs increase each level.
        ADDED_SPEED_PER_LEVEL (int): Production speed increment per level.

    Methods:
        __init__(level=1):
            Initializes the Blacksmith at the specified level and sets the production speed.

        calculate_production_speed() -> int:
            Calculates and returns the production speed based on the current level.
    """

    def __init__(self, level=1):
        super().__init__(Blacksmith.BASE_COST, Blacksmith.GROWTH_FACTOR, level)
        self.production_speed = self.calculate_production_speed()

    def calculate_production_speed(self):
        return (self.level - 1) * self.ADDED_SPEED_PER_LEVEL

    def upgrade(self):
        super().upgrade()
        self.production_speed = self.calculate_production_speed()

    def to_dict(self):
        building_dict = super().to_dict()
        building_dict["production_speed"] = self.production_speed
        return building_dict
