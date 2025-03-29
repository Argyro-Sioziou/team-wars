from flask import Blueprint, jsonify, request
from app.services.city_service import CityService

bp = Blueprint('cities', __name__, url_prefix='/api')
city_service = CityService()

@bp.route('/cities', methods=['POST'])
def create_city():
    try:
        city = city_service.create_city()
        return jsonify({"success": True, "data": city.to_dict()}), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@bp.route('/cities', methods=['GET'])
def get_cities():
    cities = city_service.get_all_cities()
    return jsonify({"success": True, "data": [city.id for city in cities]}), 200

@bp.route('/cities/<string:city_id>/buildings/<string:building_name>/upgrade', methods=['PATCH'])
def upgrade_building(city_id, building_name):
    try:
        city = city_service.upgrade_building(city_id, building_name)
        return jsonify({"success": True, "data": city.to_dict()}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400 