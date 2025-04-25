from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional

@dataclass
class UnitStats:
    attack_power: int
    defense_power: int
    health_points: int
    speed: int

class Unit(ABC):
    def __init__(
        self,
        training_cost: int,
        training_time: int,  # in seconds
        food_requirement: int,
        stats: UnitStats,
        barracks_level_required: int = 1
    ):
        self.training_cost = training_cost
        self.training_time = training_time
        self.food_requirement = food_requirement
        self.stats = stats
        self.barracks_level_required = barracks_level_required
        self.current_health = stats.health_points

    def is_alive(self) -> bool:
        return self.current_health > 0

    def take_damage(self, damage: int) -> None:
        self.current_health = max(0, self.current_health - damage)

    def heal(self, amount: int) -> None:
        self.current_health = min(self.stats.health_points, self.current_health + amount)

    def to_dict(self):
        return {
            "training_cost": self.training_cost,
            "training_time": self.training_time,
            "food_requirement": self.food_requirement,
            "stats": {
                "attack_power": self.stats.attack_power,
                "defense_power": self.stats.defense_power,
                "health_points": self.stats.health_points,
                "speed": self.stats.speed
            },
            "current_health": self.current_health,
            "barracks_level_required": self.barracks_level_required
        } 