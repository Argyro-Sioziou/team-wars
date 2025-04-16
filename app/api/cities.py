from flask import Blueprint, jsonify, request
from app.services.city_service import CityService
from domain.buildings.exceptions import CityError, InternalServerError
bp = Blueprint('cities', __name__, url_prefix='/api')
city_service = CityService()

@bp.route('/cities', methods=['POST'])
def create_city():
    try:
        data = request.json
        name = data.get('name')
        icon = data.get('icon')
        city = city_service.create_city(name, icon)
        return jsonify({"success": True, "data": city.to_dict()}), 201
    except CityError as e:
        return jsonify({"success": False, "error": e.error_code, "message": e.message}), 400
    except Exception as e:
        server_error = InternalServerError(e)
        return jsonify({"success": False, "error": server_error.error_code, "message": server_error.message}), 500

@bp.route('/cities', methods=['GET'])
def get_cities():
    try:
        cities = city_service.get_all_cities()
        return jsonify({"success": True, "data": [{ "id": city.id, "name": city.name, "icon": city.icon } for city in cities]}), 200
    except Exception as e:
        server_error = InternalServerError(e)
        return jsonify({"success": False, "error": server_error.error_code, "message": server_error.message}), 500

@bp.route('/cities/<string:city_id>/buildings/<string:building_name>/upgrade', methods=['PATCH'])
def upgrade_building(city_id, building_name):
    try:
        city = city_service.upgrade_building(city_id, building_name)
        return jsonify({"success": True, "data": city.to_dict()}), 200
    except CityError as e:
        return jsonify({"success": False, "error": e.error_code, "message": e.message}), 400
    except Exception as e:
        server_error = InternalServerError(e)
        return jsonify({"success": False, "error": server_error.error_code, "message": server_error.message}), 500

@bp.route('/cities/<string:city_id>', methods=['GET'])
def get_city(city_id):
    try:
        city = city_service.get_city_by_id(city_id)
        return jsonify({"success": True, "data": city.to_dict()}), 200
    except Exception as e:
        server_error = InternalServerError(e)
        return jsonify({"success": False, "error": server_error.error_code, "message": server_error.message}), 500
