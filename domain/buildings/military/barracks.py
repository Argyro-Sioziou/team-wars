from domain.buildings.base.building import Building

class Barracks(Building):
    BASE_COST = 750
    GROWTH_FACTOR = 1.7
    ADDED_SPEED_PER_LEVEL = 0.05

    """
    Trains both defensive and offensive units.
    Possibly upgrades to train advanced units or increase training speed.

    Key Points:
        Barracks Levels: Starts at level 1, with a maximum of level 10.
        Castle Dependency: The Barracks cannot be upgraded past the current Castle level.
        Upgrade Costs: Calculated using a base cost of 750 gold, increasing by a factor of 1.7 each level.
        Story Points: For simplicity, I used an estimate of 10 points per level, though this could be changed based on game-specific logic.
    """

    def __init__(self, level=1):
        super().__init__(self.BASE_COST, self.GROWTH_FACTOR, level)
        self.speed_bonus = self.calculate_speed_bonus()
        self.unlock_units = self.find_unlocked_units()

    def calculate_speed_bonus(self):
        return (self.level - 1) * self.ADDED_SPEED_PER_LEVEL

    def find_unlocked_units(self):
        unlocked_units = [{'name': 'Militia', 'type': 'defensive'}, {'name': 'Infantry', 'type': 'offensive'}]

        if self.level >= 3:
            unlocked_units.append({'name': 'Archer', 'type': 'defensive'})
        if self.level >= 5:
            unlocked_units.append({'name': 'Cavalry', 'type': 'offensive'})
        if self.level >= 7:
            unlocked_units.append({'name': 'Heavy Infantry', 'type': 'both'})
        if self.level >= 9:
            unlocked_units.append({'name': 'Siege Engine', 'type': 'offensive'})

        return unlocked_units

    def upgrade(self):
        super().upgrade()
        self.speed_bonus = self.calculate_speed_bonus()
        self.unlock_units = self.find_unlocked_units()

    def to_dict(self):
        return {
            **super().to_dict(),
            'speed_bonus': self.calculate_speed_bonus(),
            'unlocked_units': self.unlock_units
        }