from flask import Blueprint, jsonify
from domain.units import Infantry, Militia, Archer, HeavyInfantry, Cavalry, SiegeEngine

bp = Blueprint('units', __name__, url_prefix='/api/units')

@bp.route('/', methods=['GET'])
def get_available_units():
    """Get list of available units and their details"""
    infantry = Infantry()
    militia = Militia()
    archer = Archer()
    heavy_infantry = HeavyInfantry()
    cavalry = Cavalry()
    siege_engine = SiegeEngine()
    available_units = {
        'infantry': infantry.to_dict(),
        'militia': militia.to_dict(),
        'archer': archer.to_dict(),
        'heavy_infantry': heavy_infantry.to_dict(),
        'cavalry': cavalry.to_dict(),
        'siege_engine': siege_engine.to_dict()
    }
    return jsonify(available_units)

@bp.route('/infantry', methods=['GET'])
def get_infantry_details():
    """Get detailed information about infantry units"""
    infantry = Infantry()
    return jsonify(infantry.to_dict())

@bp.route('/militia', methods=['GET'])
def get_militia_details():
    """Get detailed information about militia units"""
    militia = Militia()
    return jsonify(militia.to_dict())

@bp.route('/archer', methods=['GET'])
def get_archer_details():
    """Get detailed information about archer units"""
    archer = Archer()
    return jsonify(archer.to_dict())

@bp.route('/heavy-infantry', methods=['GET'])
def get_heavy_infantry_details():
    """Get detailed information about heavy infantry units"""
    heavy_infantry = HeavyInfantry()
    return jsonify(heavy_infantry.to_dict())

@bp.route('/cavalry', methods=['GET'])
def get_cavalry_details():
    """Get detailed information about cavalry units"""
    cavalry = Cavalry()
    return jsonify(cavalry.to_dict())

@bp.route('/siege-engine', methods=['GET'])
def get_siege_engine_details():
    """Get detailed information about siege engine units"""
    siege_engine = SiegeEngine()
    return jsonify(siege_engine.to_dict()) 