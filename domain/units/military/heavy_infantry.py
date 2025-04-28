from domain.units.base.unit import Unit, UnitStats
from domain.units.military.archer import Archer

class HeavyInfantry(Unit):
    """
    Heavy Infantry Unit - Advanced balanced unit available from Barracks level 7
    
    A powerful unit with high health and defense, capable of both attacking
    and defending effectively. Features unique protection against archer attacks.
    Requires heavy armor and weapons from the Blacksmith.
    """
    
    ARCHER_DAMAGE_REDUCTION = 0.10  # 10% damage reduction from archers
    
    def __init__(self):
        stats = UnitStats(
            attack_power=22,  # Strong balanced attack
            defense_power=28,  # Very strong defense
            health_points=100,
            speed=3  # Slow speed value due to heavy armor
        )
        
        super().__init__(
            training_cost=120,  # 120 Gold per unit
            training_time=1050,  # 17.5 minutes = 1050 seconds
            food_requirement=2,  # 2 Food per unit
            stats=stats,
            barracks_level_required=7,
            weapon_requirements=["Heavy Armor", "Heavy Weapons"]  # Required equipment from Blacksmith
        )
    
    def take_damage(self, damage: int, attacker: Unit = None) -> None:
        """Override take_damage to implement archer damage resistance"""
        if isinstance(attacker, Archer):
            # Apply damage reduction against archer attacks
            reduced_damage = int(damage * (1 - self.ARCHER_DAMAGE_REDUCTION))
            super().take_damage(reduced_damage)
        else:
            # Normal damage from other units
            super().take_damage(damage)
    
    @property
    def unit_type(self) -> str:
        return "Heavy Infantry"
    
    @property
    def description(self) -> str:
        return "Elite infantry unit with superior defense and balanced combat capabilities. Requires heavy armor and weapons from the Blacksmith."
    
    @property
    def special_abilities(self) -> list[dict]:
        return [
            {
                "name": "Stalwart Defense",
                "description": f"Reduces incoming damage from archers by {self.ARCHER_DAMAGE_REDUCTION * 100}%"
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
            "archer_damage_reduction": self.ARCHER_DAMAGE_REDUCTION
        } 