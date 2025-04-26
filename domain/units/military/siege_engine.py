from domain.units.base.unit import Unit, UnitStats
from typing import Optional

class SiegeEngine(Unit):
    """
    Siege Engine Unit - Advanced siege unit available from Barracks level 9
    
    A powerful siege weapon specialized in destroying enemy structures.
    Highly effective against buildings but vulnerable to direct unit attacks.
    Requires Workshop and high-level Barracks.
    """
    
    STRUCTURE_DAMAGE_MULTIPLIER = 2.0  # Double damage to structures
    WALL_DEFENSE_REDUCTION = 0.20  # 20% wall defense reduction
    
    def __init__(self):
        stats = UnitStats(
            attack_power=5,  # Base attack power against units
            defense_power=10,
            health_points=150,
            speed=2  # Very slow speed value
        )
        
        super().__init__(
            training_cost=600,  # 600 Gold per unit
            training_time=600,  # 10 minutes = 600 seconds
            food_requirement=5,  # 5 Food per unit
            stats=stats,
            barracks_level_required=9
        )
        
        self.structure_attack_power = 50  # Special attack power against structures
    
    def calculate_attack_damage(self, target_type: str = "unit") -> float:
        """
        Calculate attack damage based on target type
        
        Args:
            target_type: Either "unit" or "structure"
        """
        if target_type.lower() == "structure":
            return self.structure_attack_power * self.STRUCTURE_DAMAGE_MULTIPLIER
        return self.stats.attack_power
    
    def calculate_wall_defense(self, original_defense: float) -> float:
        """Calculate reduced wall defense after breach effect"""
        return original_defense * (1 - self.WALL_DEFENSE_REDUCTION)
    
    @property
    def unit_type(self) -> str:
        return "Siege Engine"
    
    @property
    def description(self) -> str:
        return "Heavy siege weapon specialized in destroying enemy structures and breaching walls."
    
    @property
    def special_abilities(self) -> list[dict]:
        return [
            {
                "name": "Siege Specialist",
                "description": (
                    f"Deals {self.structure_attack_power} base damage to structures, "
                    f"multiplied by {self.STRUCTURE_DAMAGE_MULTIPLIER}x"
                )
            },
            {
                "name": "Wall Breacher",
                "description": f"Reduces enemy City Walls defense bonus by {self.WALL_DEFENSE_REDUCTION * 100}% during attacks"
            }
        ]
    
    @property
    def requirements(self) -> list[dict]:
        return [
            {
                "type": "building",
                "name": "Barracks",
                "level": 9
            },
            {
                "type": "building",
                "name": "Workshop",
                "level": 1
            }
        ]
    
    def to_dict(self):
        base_dict = super().to_dict()
        return {
            **base_dict,
            "unit_type": self.unit_type,
            "description": self.description,
            "special_abilities": self.special_abilities,
            "requirements": self.requirements,
            "structure_attack_power": self.structure_attack_power,
            "effective_structure_damage": self.calculate_attack_damage("structure"),
            "effective_unit_damage": self.calculate_attack_damage("unit"),
            "wall_defense_reduction": self.WALL_DEFENSE_REDUCTION
        } 