from domain.buildings.base.building import Building

class Workshop(Building):
    BASE_COST = 2000
    GROWTH_FACTOR = 1.5
    MAX_LEVEL = 5
    ADDED_SPEED_PER_LEVEL = 0.15
    BASE_PRODUCTION_TIME = 5

    """
    Workshop building for constructing Siege Engines and advanced mechanical units.

    Attributes:
        level (int): Current level of the Workshop, initialized to 1 by default.
        production_speed_bonus (float): Percentage reduction in production time based on the current level.
        production_time (float): Total production time calculated based on current level and speed bonus.
        unlocked_equipment (list): List of equipment available based on the Workshop's level.

    Constants:
        BASE_COST (int): Initial cost to build the Workshop.
        GROWTH_FACTOR (float): Multiplier applied to upgrade costs with each level.
        MAX_LEVEL (int): Maximum level the Workshop can achieve.
        ADDED_SPEED_PER_LEVEL (float): Reduction in production time per level.
        BASE_PRODUCTION_TIME (int): Initial time required for production at level 1.

    Methods:
        __init__(level=1, locked=True):
            Initializes the Workshop at the specified level and calculates initial attributes.

        calculate_speed_bonus() -> float:
            Calculates the production speed bonus based on the current level.

        calculate_production_time(base_time=BASE_PRODUCTION_TIME) -> float:
            Calculates and returns the production time based on the current speed bonus.

        find_unlocked_equipment() -> list:
            Determines and returns the list of equipment that becomes available at specific levels.
    """
    def __init__(self, level=1, locked=True):
        super().__init__(self.BASE_COST, self.GROWTH_FACTOR, level, locked, self.MAX_LEVEL)
        self.production_speed_bonus = self.calculate_speed_bonus()
        self.production_time = self.calculate_production_time()
        self.unlock_equipment = self.find_unlocked_equipment()

    def calculate_speed_bonus(self):
        return (self.level - 1) * self.ADDED_SPEED_PER_LEVEL

    def calculate_production_time(self, base_time=BASE_PRODUCTION_TIME):
        return base_time * (1 - self.production_speed_bonus)

    def find_unlocked_equipment(self):
        unlocked_equipment = ['Basic']
        if self.level >= 3:
            unlocked_equipment.append('Advanced')
        if self.level == 5:
            unlocked_equipment.append('Elite')

        return unlocked_equipment

    def upgrade(self):
        super().upgrade()
        self.production_speed_bonus = self.calculate_speed_bonus()
        self.production_time = self.calculate_production_time()
        self.unlock_equipment = self.find_unlocked_equipment()

    def to_dict(self):
        return {
            **super().to_dict(),
            "production_speed_bonus": self.production_speed_bonus,
            "production_time": self.production_time,
            "unlocked_equipment": self.unlock_equipment
        }

