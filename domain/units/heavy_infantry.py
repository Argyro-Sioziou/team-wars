from domain.units.base import Unit

class HeavyInfantry(Unit):
    def __init__(self):
        super().__init__(
            name="Heavy Infantry",
            type="both",
            base_health=200,
            base_damage=60,
            base_defense=50,
            training_cost=600,
            training_time=360,  # 6 minutes
            level_requirement=7,
            description="Elite unit, powerful in both attack and defense"
        ) 