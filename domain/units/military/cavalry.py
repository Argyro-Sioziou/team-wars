from domain.units.base.unit import Unit, UnitStats

class Cavalry(Unit):
    """
    Cavalry Unit - Fast offensive unit available from Barracks level 5
    
    A powerful mounted unit specializing in swift attacks and mobility.
    Requires both weapons from the Blacksmith and horses from the Stable.
    Features enhanced mobility for faster city attacks.
    """
    
    def __init__(self):
        stats = UnitStats(
            attack_power=25,  # Strong attack power
            defense_power=12,  # Moderate defense
            health_points=80,
            speed=8  # Fast speed value for high mobility
        )
        
        super().__init__(
            training_cost=100,  # 100 Gold per unit
            training_time=900,  # 15 minutes = 900 seconds
            food_requirement=2,  # 2 Food per unit
            stats=stats,
            barracks_level_required=5,
            weapon_requirements=["Sword", "Horse"],  # Required equipment from Blacksmith and Stable
            facility_requirements=["Blacksmith", "Stable"]  # Required buildings
        )
    
    @property
    def unit_type(self) -> str:
        return "Cavalry"
    
    @property
    def description(self) -> str:
        return "Fast-moving mounted unit with superior mobility and strong offensive capabilities. Requires swords from Blacksmith and horses from Stable."
    
    @property
    def special_abilities(self) -> list[dict]:
        return [
            {
                "name": "High Mobility",
                "description": "Superior speed allows for reduced travel time when attacking enemy cities"
            }
        ]
    
    def to_dict(self):
        base_dict = super().to_dict()
        return {
            **base_dict,
            "unit_type": self.unit_type,
            "description": self.description,
            "special_abilities": self.special_abilities,
            "weapon_requirements": self.weapon_requirements,
            "facility_requirements": self.facility_requirements
        } 