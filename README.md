# Outlier

Outlier contains njob4u, tomatime, knowlegraph, network, goal

# Table of Contents
1. [Function](#Function)
2. [Technology](#Technology)

# Function
## njob4u

njob4u means 'New Job for You'. 

### Value Proposition
For people who wants to change job, it requires huge amount of time investment to search various job web sites. Most of the jub websites provides very simple search method, and lack customized functionality.
njob4u can provide customized search function by study personal data. And it can also provide advice on career plan and area to improve based by analyzing big data.

### Main Features
The user start with specifying basic expectation on the new job, e.g. salary, industry, title, city. The solution grab the relevant information from various job websites, then remove the duplicates, extract information, orgnizing data to help the users understand much better of targeted next jobs and topics which fit. 
According to the jobs and topics, the solution can recommend users relevant positions, and keep improving the model by analyzing the user feedback. 
The solution keeps monitoring various job websites. Once match position is post, the solution will inform the users.
By analyzing job description, the solution can provide focus area on competence building for the users.

## tomatime
    - Deploy DocumentDB
    - More unit tests
    - Repository
    - Event sourcing
    - CQRS
    - Better UI, with floating categories/tags, drag & drop, styles
    - Better validation includes server side
    - Better UI feedback

## knowlegraph

## Network

## Goal

# Technology

## How to start

Install pipenv: pipenv is a tool that aims to bring the best of all packaging worlds (bundler, composer, npm, cargo, yarn, etc.) to the Python world.

Create virtual environment:

pipenv --three

Install packages in virtual environment:
pipenv install

Start the shell:

pipenv shell

Start backend:

./backend_run.sh

Start frontend:

cd frontend_main
ng serve

## Infrastructure

    - API management
    - Docker cluster
    - Security (key in app setting, key vault)
    - Authentication (self identity service)
    - Authorization (read-write separation)

## Reference Articiles

https://auth0.com/blog/using-python-flask-and-angular-to-build-modern-apps-part-1/
