from domain.units.base import Unit

class SiegeEngine(Unit):
    def __init__(self):
        super().__init__(
            name="Siege Engine",
            type="offensive",
            base_health=300,
            base_damage=100,
            base_defense=40,
            training_cost=1000,
            training_time=600,  # 10 minutes
            level_requirement=9,
            description="Powerful siege unit, excellent for breaking through defenses"
        ) 