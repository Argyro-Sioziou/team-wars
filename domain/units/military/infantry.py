from domain.units.base.unit import Unit, UnitStats

class Infantry(Unit):
    """
    Infantry Unit - Basic offensive unit available from Barracks level 1
    
    A versatile ground unit that forms the backbone of any army.
    Effective for early-game offensive strategies with balanced stats.
    Requires basic offensive weapons (swords) from the Blacksmith.
    """
    
    def __init__(self):
        stats = UnitStats(
            attack_power=15,  # Strong attack power
            defense_power=10,  # Moderate defense
            health_points=60,
            speed=5  # Moderate speed value
        )
        
        super().__init__(
            training_cost=50,  # 50 Gold per unit
            training_time=600,  # 10 minutes = 600 seconds
            food_requirement=1,  # 1 Food per unit
            stats=stats,
            barracks_level_required=1,
            weapon_requirements=["Basic Offensive Weapon"]  # Required weapons from Blacksmith
        )
    
    @property
    def unit_type(self) -> str:
        return "Infantry"
    
    @property
    def description(self) -> str:
        return "Basic offensive unit specializing in attack. Requires basic offensive weapons (swords)."
    
    def to_dict(self):
        base_dict = super().to_dict()
        return {
            **base_dict,
            "unit_type": self.unit_type,
            "description": self.description,
            "weapon_requirements": self.weapon_requirements
        } 