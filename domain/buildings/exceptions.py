class CityError(Exception):
    """Base exception for city-related errors"""
    pass

class InsufficientGoldError(CityError):
    """Raised when there isn't enough gold for an operation"""
    pass

class BuildingLockedError(CityError):
    """Raised when trying to upgrade a locked building"""
    pass

class BuildingLevelError(CityError):
    """Raised when building level requirements are not met"""
    pass

class InvalidBuildingError(CityError):
    """Raised when trying to access an invalid building"""
    pass 