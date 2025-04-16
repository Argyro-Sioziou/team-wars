class CityError(Exception):
    """Base exception for city-related errors"""
    def __init__(self, error_code: str, message: str):
        self.error_code = error_code
        self.message = message

        super().__init__(f"[{error_code}] {message}")

class CityNotFoundError(CityError):
    """Raised when a city is not found"""
    def __init__(self, message: str):
        super().__init__("CITY_NOT_FOUND", message)

class InsufficientGoldError(CityError):
    """Raised when there isn't enough gold for an operation"""
    def __init__(self, message: str):
        super().__init__("INSUFFICIENT_GOLD", message)

class BuildingLockedError(CityError):
    """Raised when trying to upgrade a locked building"""
    def __init__(self, message: str):
        super().__init__("BUILDING_LOCKED", message)

class BuildingLevelError(CityError):
    """Raised when building level requirements are not met"""
    def __init__(self, message: str):
        super().__init__("BUILDING_LEVEL_ERROR", message)

class InvalidBuildingError(CityError):
    """Raised when trying to access an invalid building"""
    def __init__(self, message: str):
        super().__init__("INVALID_BUILDING", message)

class InternalServerError(CityError):
    """Raised when an unexpected error occurs"""
    def __init__(self, message: str = "An unexpected error occurred."):
        super().__init__("INTERNAL_SERVER_ERROR", message)