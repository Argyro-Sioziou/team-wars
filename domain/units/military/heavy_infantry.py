from domain.units.base.unit import Unit, UnitStats

class HeavyInfantry(Unit):
    """
    Heavy Infantry Unit - Advanced balanced unit available from Barracks level 7
    
    A powerful unit with high health and defense, capable of both attacking
    and defending effectively. Features unique damage reduction capabilities.
    """
    
    DAMAGE_REDUCTION = 0.10  # 10% damage reduction
    
    def __init__(self):
        stats = UnitStats(
            attack_power=25,
            defense_power=30,
            health_points=100,
            speed=3  # Slow speed value
        )
        
        super().__init__(
            training_cost=400,  # 400 Gold per unit
            training_time=420,  # 7 minutes = 420 seconds
            food_requirement=3,  # 3 Food per unit
            stats=stats,
            barracks_level_required=7
        )
    
    def take_damage(self, damage: int) -> None:
        """Override take_damage to implement damage resistance"""
        reduced_damage = int(damage * (1 - self.DAMAGE_REDUCTION))
        super().take_damage(reduced_damage)
    
    @property
    def unit_type(self) -> str:
        return "Heavy Infantry"
    
    @property
    def description(self) -> str:
        return "Elite infantry unit with high durability and balanced combat capabilities."
    
    @property
    def special_abilities(self) -> list[dict]:
        return [
            {
                "name": "Damage Resistance",
                "description": f"Reduces incoming damage by {self.DAMAGE_REDUCTION * 100}%"
            }
        ]
    
    def to_dict(self):
        base_dict = super().to_dict()
        return {
            **base_dict,
            "unit_type": self.unit_type,
            "description": self.description,
            "special_abilities": self.special_abilities,
            "damage_reduction": self.DAMAGE_REDUCTION
        } 