
# Roundtable-web

Junior Design project - web app that lets you collaborate on platform-agnostic playlists

Team 7302 - Riley Osborn, Phillip Reeder, Gabor Siffel, Cal Stephens, Jake Waldner

### Required Tools

- NodeJS, npm
- Python 3 (command line: python3)
- openssl (command line tool) (for generating SSL certificate)

### Usage

    make setup      # Set up dev environment (installs necessary dependencies)
    make setupwin   # Set up dev environment on Windows
    make bundle     # Generates bundled ReactJS JavaScript file
    make run        # Run server (without encryption)
    make runhttps   # Run server using https
    make genssl     # Generates a new self-signed SSL certificate (openssl)
    make clean      # Removes results of `make bundle` (doesn't work on Windows)

Be sure to generate an SSL certificate before trying to run the server.

Once the server is running, you don't have to shut it off in order to re-bundle (in a different terminal) the front-end code.

### Project Layout

- The **public** directory contains files publicly accessible to anyone and served as plain files by the web server.
- The **react** directory contains the front-end source code.
    + New webpage routes can be added in **react/routes.jsx**.
    + The entrypoint is **react/app-client.jsx**.
- The **server** directory contains the source-code for the web server.
    + The entrypoint is **server/server.py**.
    + New api/non-webpage routes can be added in this file.

### License

[MIT License](LICENSE)
