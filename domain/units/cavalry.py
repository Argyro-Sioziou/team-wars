from domain.units.base import Unit

class Cavalry(Unit):
    def __init__(self):
        super().__init__(
            name="Cavalry",
            type="offensive",
            base_health=150,
            base_damage=50,
            base_defense=35,
            training_cost=400,
            training_time=240,  # 4 minutes
            level_requirement=5,
            description="Fast offensive unit, great for raiding and flanking"
        ) 