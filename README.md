# Cookbook
A basic website to store my recipes


## Development

We use Django as the backend Python web framework and React as the frontend framework. 

To run this project you must have installed:

Python 3.x
Node.js (to access npm)

To build the React bundles use:

npm run build_prod (note: I have not had time to work this out for easy development)
python manage.py runserver (to run the server locally)

Highly recommend PyCharms as the used IDE, purely because I like it.


You must include a .env file in development. Look at .env.default for the required environment variables.


## Deployment

Currently using Heroku as my web hosting provider. I have linked my account to github so every push to the Production 
branch automatically pushes to the Heroku master branch.

