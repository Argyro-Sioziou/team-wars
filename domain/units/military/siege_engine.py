from domain.units.base.unit import Unit, UnitStats
from typing import Optional

class SiegeEngine(Unit):
    """
    Siege Engine Unit - Advanced siege unit available from Barracks level 9
    
    A powerful siege weapon specialized in destroying enemy structures.
    Highly effective against buildings but vulnerable to direct unit attacks.
    Requires Siege Machinery from both the Blacksmith and Workshop.
    """
    
    STRUCTURE_DAMAGE_MULTIPLIER = 2.0  # Double damage to structures
    
    def __init__(self):
        stats = UnitStats(
            attack_power=25,  # Base attack power against units
            defense_power=5,  # Low defense, vulnerable to attacks
            health_points=150,
            speed=2  # Very slow speed value
        )
        
        super().__init__(
            training_cost=200,  # 200 Gold per unit
            training_time=1800,  # 30 minutes = 1800 seconds
            food_requirement=3,  # 3 Food per unit
            stats=stats,
            barracks_level_required=9,
            weapon_requirements=["Siege Machinery"],  # Required equipment
            facility_requirements=["Blacksmith", "Workshop"]  # Required buildings
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
    
    @property
    def unit_type(self) -> str:
        return "Siege Engine"
    
    @property
    def description(self) -> str:
        return "Heavy siege weapon specialized in destroying enemy structures. Requires Siege Machinery from both Blacksmith and Workshop."
    
    @property
    def special_abilities(self) -> list[dict]:
        return [
            {
                "name": "Structure Demolisher",
                "description": (
                    f"Deals {self.structure_attack_power} base damage to structures, "
                    f"doubled to {self.structure_attack_power * self.STRUCTURE_DAMAGE_MULTIPLIER} against City Walls and buildings"
                )
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
            "facility_requirements": self.facility_requirements,
            "structure_attack_power": self.structure_attack_power,
            "effective_structure_damage": self.calculate_attack_damage("structure"),
            "effective_unit_damage": self.calculate_attack_damage("unit")
        } 