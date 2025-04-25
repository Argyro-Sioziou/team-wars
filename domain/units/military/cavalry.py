from domain.units.base.unit import Unit, UnitStats

class Cavalry(Unit):
    """
    Cavalry Unit - Fast offensive unit available from Barracks level 5
    
    A powerful mounted unit specializing in swift attacks and mobility.
    Features enhanced attack power through flanking maneuvers.
    """
    
    FLANKING_BONUS = 0.25  # 25% attack bonus from flanking
    
    def __init__(self):
        stats = UnitStats(
            attack_power=30,
            defense_power=20,
            health_points=80,
            speed=8  # Fast speed value
        )
        
        super().__init__(
            training_cost=300,  # 300 Gold per unit
            training_time=300,  # 5 minutes = 300 seconds
            food_requirement=4,  # 4 Food per unit
            stats=stats,
            barracks_level_required=5
        )
    
    def calculate_attack_damage(self) -> float:
        """Calculate attack damage including flanking bonus"""
        base_damage = self.stats.attack_power
        return base_damage * (1 + self.FLANKING_BONUS)
    
    @property
    def unit_type(self) -> str:
        return "Cavalry"
    
    @property
    def description(self) -> str:
        return "Fast-moving mounted unit specializing in swift and powerful attacks."
    
    @property
    def special_abilities(self) -> list[dict]:
        return [
            {
                "name": "Flanking Maneuver",
                "description": f"Increases attack effectiveness by {self.FLANKING_BONUS * 100}% when attacking"
            }
        ]
    
    def to_dict(self):
        base_dict = super().to_dict()
        return {
            **base_dict,
            "unit_type": self.unit_type,
            "description": self.description,
            "special_abilities": self.special_abilities,
            "flanking_bonus": self.FLANKING_BONUS,
            "effective_attack": self.calculate_attack_damage()
        } 