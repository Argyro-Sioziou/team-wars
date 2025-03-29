from domain.units.base import Unit

class Infantry(Unit):
    def __init__(self):
        super().__init__(
            name="Infantry",
            type="offensive",
            base_health=120,
            base_damage=35,
            base_defense=25,
            training_cost=200,
            training_time=120,  # 2 minutes
            level_requirement=1,
            description="Standard offensive unit, balanced in attack and defense"
        ) 