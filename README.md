# Hand Me Ups

## Setup

1. Start by installing front and backend dependencies. While in the root directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

2. Set up the environmental (.env) file

```
cp .env.template .env
```

3. Set up the config (config.json) file

```
cp config\config.json.template config\config.json
```

4. Add the private keys / database information within the new files

* GOOGLE MAPs Api: <https://developers.google.com/maps/documentation/geocoding/start>

5. After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.
