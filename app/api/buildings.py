from flask import Blueprint, jsonify
from app.services.city_service import CityService

bp = Blueprint('buildings', __name__, url_prefix='/api')

@bp.route('/buildings', methods=['GET'])
def get_buildings():
    buildings = [
        {'name': 'Barracks', 'type': 'BARRACKS', 'cost': 100},
        {'name': 'Blacksmith', 'type': 'BLACKSMITH', 'cost': 100},
        {'name': 'Castle', 'type': 'CASTLE', 'cost': 100},
        {'name': 'City Walls', 'type': 'CITY_WALLS', 'cost': 100},
        {'name': 'Warehouse', 'type': 'WAREHOUSE', 'cost': 100},
        {'name': 'Workshop', 'type': 'WORKSHOP', 'cost': 100}
    ]
    return jsonify({"success": True, "data": buildings}), 200 