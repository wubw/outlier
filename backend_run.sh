#!/bin/bash

export FLASK_APP=./backend_main.py
FLASK_DEBUG=1
source $(pipenv --venv)/bin/activate
flask run -h 0.0.0.0