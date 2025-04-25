from domain.units.base.unit import Unit, UnitStats

class Infantry(Unit):
    """
    Infantry Unit - Basic offensive unit available from Barracks level 1
    
    A versatile ground unit that forms the backbone of any army.
    Effective for early-game offensive strategies with balanced stats.
    """
    
    def __init__(self):
        stats = UnitStats(
            attack_power=15,
            defense_power=10,
            health_points=60,
            speed=5  # Moderate speed value
        )
        
        super().__init__(
            training_cost=100,  # 100 Gold per unit
            training_time=120,  # 2 minutes = 120 seconds
            food_requirement=2,  # 2 Food per unit
            stats=stats,
            barracks_level_required=1
        )
    
    @property
    def unit_type(self) -> str:
        return "Infantry"
    
    @property
    def description(self) -> str:
        return "Basic offensive unit with balanced combat capabilities."
    
    def to_dict(self):
        base_dict = super().to_dict()
        return {
            **base_dict,
            "unit_type": self.unit_type,
            "description": self.description
        } 