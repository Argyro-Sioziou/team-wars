from domain.units.base.unit import Unit, UnitStats
from domain.units.military.infantry import Infantry

class Archer(Unit):
    """
    Archer Unit - Ranged defensive unit available from Barracks level 3
    
    A specialized defensive unit with ranged attack capabilities.
    Effective against infantry units and provides strong defensive support.
    """
    
    INFANTRY_DAMAGE_MULTIPLIER = 1.5  # 50% bonus damage to infantry
    
    def __init__(self):
        stats = UnitStats(
            attack_power=20,
            defense_power=15,
            health_points=50,
            speed=5  # Moderate speed value
        )
        
        super().__init__(
            training_cost=150,  # 150 Gold per unit
            training_time=180,  # 3 minutes = 180 seconds
            food_requirement=2,  # 2 Food per unit
            stats=stats,
            barracks_level_required=3
        )
    
    def calculate_damage_against(self, target_unit: Unit) -> float:
        """Calculate damage against a specific unit type, including bonuses"""
        base_damage = self.stats.attack_power
        
        # Apply bonus damage against Infantry units
        if isinstance(target_unit, Infantry):
            return base_damage * self.INFANTRY_DAMAGE_MULTIPLIER
            
        return base_damage
    
    @property
    def unit_type(self) -> str:
        return "Archer"
    
    @property
    def description(self) -> str:
        return "Ranged defensive unit with bonus damage against infantry units."
    
    @property
    def special_abilities(self) -> list[dict]:
        return [
            {
                "name": "Ranged Attack",
                "description": "Can attack enemies before they reach melee units"
            },
            {
                "name": "Infantry Hunter",
                "description": f"Deals {(self.INFANTRY_DAMAGE_MULTIPLIER - 1) * 100}% extra damage to Infantry units"
            }
        ]
    
    def to_dict(self):
        base_dict = super().to_dict()
        return {
            **base_dict,
            "unit_type": self.unit_type,
            "description": self.description,
            "special_abilities": self.special_abilities,
            "is_ranged": True
        } 