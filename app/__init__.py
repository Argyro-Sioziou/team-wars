from flask import Flask
from flask_cors import CORS
from app.config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app)

    from app.api import cities, buildings, units
    app.register_blueprint(cities.bp)
    app.register_blueprint(buildings.bp)
    app.register_blueprint(units.bp)

    @app.route('/')
    def index():
        return {
            'message': 'Welcome to Team Wars API',
            'endpoints': {
                'units': '/api/units',
                'cities': '/api/cities',
                'buildings': '/api/buildings'
            }
        }

    return app 