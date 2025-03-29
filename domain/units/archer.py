from domain.units.base import Unit

class Archer(Unit):
    def __init__(self):
        super().__init__(
            name="Archer",
            type="defensive",
            base_health=80,
            base_damage=45,
            base_defense=15,
            training_cost=300,
            training_time=180,  # 3 minutes
            level_requirement=3,
            description="Ranged defensive unit, excels at defending walls"
        ) 