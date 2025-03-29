from domain.buildings.base.building import Building

class Castle(Building):
    BASE_COST = 1000
    GROWTH_FACTOR = 1.8

    """
    Castle building representing the central hub of the city and the player's progress.

    Attributes:
        level (int): Current level of the Castle, initialized to 1 by default.

    Constants:
        BASE_COST (int): Initial cost to build or upgrade the Castle.
        GROWTH_FACTOR (float): Multiplier used to increase upgrade costs with each level.

    Methods:
        __init__(level=1):
            Initializes the Castle at the specified level and sets base and growth factor for cost calculations.
    """

    def __init__(self, level=1):
        super().__init__(Castle.BASE_COST, Castle.GROWTH_FACTOR, level, False)
        self.build(12)
