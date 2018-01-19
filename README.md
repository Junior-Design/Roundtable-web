
# Roundtable-web

Junior Design project - web app that lets you collaborate on platform-agnostic playlists

### Required Tools

- NodeJS, npm
- Go
- openssl (command line tool)

### Usage

    make setup      # Set up dev environment (installs necessary dependencies)
    make ssl        # Generates a new self-signed SSL certificate (openssl)
    make run        # Run Go server
    make bundle     # Generates bundled ReactJS JavaScript file
    make clean      # Removes results of `make bundle` (doesn't work on Windows)

Be sure to generate an SSL certificate before trying to run the server.

Once the server is running, you don't have to shut it off in order to re-bundle (in a different terminal) the front-end code.

### Project Layout

- The **assets** directory contains static assets publicly accessible to anyone and served as plain files by the web server.
- The **react** directory contains the front-end source code.
    + New webpage routes can be added in **react/routes.js**.
    + The entrypoint is **react/app-client.js**.
- The **server.go** file is the entrypoint for the web server.
    + New api/non-webpage routes can be added in this file.
