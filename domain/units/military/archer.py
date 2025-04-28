from domain.units.base.unit import Unit, UnitStats
from domain.units.military.infantry import Infantry

class Archer(Unit):
    """
    Archer Unit - Ranged defensive unit available from Barracks level 3
    
    A specialized defensive unit with ranged attack capabilities.
    Effective against infantry units and provides strong defensive support.
    Requires bows from the Blacksmith for training.
    """
    
    INFANTRY_BONUS_DAMAGE = 5  # Flat +5 attack score bonus against infantry
    
    def __init__(self):
        stats = UnitStats(
            attack_power=18,  # Strong ranged attack
            defense_power=18,  # Strong defense
            health_points=50,
            speed=5  # Moderate speed value
        )
        
        super().__init__(
            training_cost=75,  # 75 Gold per unit
            training_time=720,  # 12 minutes = 720 seconds
            food_requirement=1,  # 1 Food per unit
            stats=stats,
            barracks_level_required=3,
            weapon_requirements=["Bow"]  # Required weapons from Blacksmith
        )
    
    def calculate_damage_against(self, target_unit: Unit) -> float:
        """Calculate damage against a specific unit type, including bonuses"""
        base_damage = self.stats.attack_power
        
        # Apply flat bonus damage against Infantry units
        if isinstance(target_unit, Infantry):
            return base_damage + self.INFANTRY_BONUS_DAMAGE
            
        return base_damage
    
    @property
    def unit_type(self) -> str:
        return "Archer"
    
    @property
    def description(self) -> str:
        return "Ranged defensive unit with bonus damage against infantry units. Requires bows from the Blacksmith."
    
    @property
    def special_abilities(self) -> list[dict]:
        return [
            {
                "name": "Ranged Attack",
                "description": "Can attack enemies before they reach melee units"
            },
            {
                "name": "Infantry Hunter",
                "description": f"Deals +{self.INFANTRY_BONUS_DAMAGE} bonus damage to Infantry units"
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
            "is_ranged": True
        } 