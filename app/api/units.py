from flask import Blueprint, jsonify
from domain.units import Infantry, Militia

bp = Blueprint('units', __name__, url_prefix='/api/units')

@bp.route('/', methods=['GET'])
def get_available_units():
    """Get list of available units and their details"""
    infantry = Infantry()
    militia = Militia()
    available_units = {
        'infantry': infantry.to_dict(),
        'militia': militia.to_dict()
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