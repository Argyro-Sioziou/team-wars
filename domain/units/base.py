from dataclasses import dataclass
from typing import List, Dict
from domain.units.militia import Militia
from domain.units.infantry import Infantry
from domain.units.archer import Archer
from domain.units.cavalry import Cavalry
from domain.units.heavy_infantry import HeavyInfantry
from domain.units.siege_engine import SiegeEngine

@dataclass
class Unit:
    name: str
    type: str  # 'defensive', 'offensive', or 'both'
    base_health: int
    base_damage: int
    base_defense: int
    training_cost: int
    training_time: int  # in seconds
    level_requirement: int
    description: str

    def __post_init__(self):
        self.current_health = self.base_health
        self.current_damage = self.base_damage
        self.current_defense = self.base_defense

    def to_dict(self) -> Dict:
        return {
            'name': self.name,
            'type': self.type,
            'health': self.current_health,
            'damage': self.current_damage,
            'defense': self.current_defense,
            'training_cost': self.training_cost,
            'training_time': self.training_time,
            'level_requirement': self.level_requirement,
            'description': self.description
        }

    @classmethod
    def get_all_units(cls) -> List['Unit']:
        """Returns a list of all available units in the game."""
        return [
            Militia(),
            Infantry(),
            Archer(),
            Cavalry(),
            HeavyInfantry(),
            SiegeEngine()
        ] 