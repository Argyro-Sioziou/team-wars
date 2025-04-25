from flask import Blueprint, jsonify
from domain.units import Infantry

bp = Blueprint('units', __name__, url_prefix='/api/units')

@bp.route('/', methods=['GET'])
def get_available_units():
    """Get list of available units and their details"""
    infantry = Infantry()
    available_units = {
        'infantry': infantry.to_dict()
    }
    return jsonify(available_units)

@bp.route('/infantry', methods=['GET'])
def get_infantry_details():
    """Get detailed information about infantry units"""
    infantry = Infantry()
    return jsonify(infantry.to_dict()) 