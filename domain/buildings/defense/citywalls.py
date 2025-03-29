from domain.buildings.base.building import Building

class CityWalls(Building):
    BASE_COST = 800
    GROWTH_FACTOR = 1.75
    BASE_DEFENSE_BONUS = 5
    ADDED_DEFENSE_PER_LEVEL = 5

    """
    Defensive structure that provides protection to the city. Upgrading increases the defense bonus.

    Attributes:
        level (int): Current level of the City Walls, defaulting to 1.
        defense_bonus (int): Total defense bonus provided, calculated based on level.

    Constants:
        BASE_COST (int): Initial cost to build the City Walls.
        GROWTH_FACTOR (float): Multiplier applied to upgrade costs with each level.
        BASE_DEFENSE_BONUS (int): Initial defense bonus at level 1.
        ADDED_DEFENSE_PER_LEVEL (int): Incremental defense bonus added with each level.

    Methods:
        __init__(level=1):
            Initializes the City Walls at the specified level and calculates the initial defense bonus.

        calculate_defense_bonus() -> int:
            Calculates and returns the defense bonus based on the current level.
    """

    def __init__(self, level=1):
        super().__init__(self.BASE_COST, self.GROWTH_FACTOR, level)
        self.defense_bonus = self.calculate_defense_bonus()

    def calculate_defense_bonus(self):
        return self.BASE_DEFENSE_BONUS + (self.level - 1) * self.ADDED_DEFENSE_PER_LEVEL

    def upgrade(self):
        super().upgrade()
        self.defense_bonus = self.calculate_defense_bonus()

    def to_dict(self):
        building_dict = super().to_dict()
        building_dict["defense_bonus"] = self.defense_bonus
        return building_dict