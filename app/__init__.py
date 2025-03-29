from flask import Flask
from flask_cors import CORS
from app.config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app)

    from app.api import cities, buildings
    app.register_blueprint(cities.bp)
    app.register_blueprint(buildings.bp)

    return app 