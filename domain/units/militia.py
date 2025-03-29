from domain.units.base import Unit

class Militia(Unit):
    def __init__(self):
        super().__init__(
            name="Militia",
            type="defensive",
            base_health=100,
            base_damage=20,
            base_defense=30,
            training_cost=100,
            training_time=60,  # 1 minute
            level_requirement=1,
            description="Basic defensive unit, good for protecting your city"
        ) 