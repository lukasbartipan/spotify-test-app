# OAuth bridge template

This service logs in to Spotify and redirects the user to a given frontend application with a valid access_token as a parameter in the url.

## Development mode

In development mode, it assumes you are running the frontend on localhost:3000, but the server itself will be running on localhost:8888.

In order to start developing, register a Spotify Application here:
https://developer.spotify.com/my-applications

On that page, add http://localhost:8888 as a callback url (don't forget to hit save at the bottom of the page)

Then go to http://localhost:8888/login in your browser. This will initiate the login flow and finally redirect to http://localhost:3000?access_token=ZZZZZ where ZZZZZ is a valid access token that you can use to do operations in the Spotify API.

In order to start this you need to create a .env file in the backend that includes the Spotify Client ID and Client Secret

```
# env file

# App configuration
PORT=8888
REDIRECT_URI="http://localhost:8888/callback"
FRONTEND_URI="http://localhost:3000/"

# Spotify app credentials
SPOTIFY_CLIENT_ID="yourClientID"
SPOTIFY_CLIENT_SECRET="yourClientSecret"
```

