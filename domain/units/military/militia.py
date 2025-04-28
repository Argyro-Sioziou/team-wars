from domain.units.base.unit import Unit, UnitStats

class Militia(Unit):
    """
    Militia Unit - Basic defensive unit available from Barracks level 1
    
    A basic defensive unit that provides early-game city protection.
    Cost-effective for defensive strategies with balanced offensive capabilities.
    Requires basic defensive weapons (spears, shields) from the Blacksmith.
    """
    
    def __init__(self):
        stats = UnitStats(
            attack_power=10,  # Increased to match new attack score
            defense_power=15,  # Increased to match new defense score
            health_points=50,
            speed=3  # Maintaining original speed value
        )
        
        super().__init__(
            training_cost=50,  # 50 Gold per unit
            training_time=600,  # 10 minutes = 600 seconds
            food_requirement=1,  # 1 Food per unit
            stats=stats,
            barracks_level_required=1,
            weapon_requirements=["Basic Defensive Weapon"]  # Required weapons from Blacksmith
        )
    
    @property
    def unit_type(self) -> str:
        return "Militia"
    
    @property
    def description(self) -> str:
        return "Basic defensive unit with balanced stats. Requires basic defensive weapons (spears, shields)."
    
    def to_dict(self):
        base_dict = super().to_dict()
        return {
            **base_dict,
            "unit_type": self.unit_type,
            "description": self.description,
            "weapon_requirements": self.weapon_requirements
        } 