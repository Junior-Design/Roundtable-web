
# Roundtable-web

Junior Design project - web app that lets you collaborate on platform-agnostic playlists

Team 7302 - Riley Osborn, Phillip Reeder, Gabor Siffel, Cal Stephens, Jake Waldner

## Release Notes

Coming soon.

## Development / Install Guide

### Required Tools

- git
- NodeJS, npm
- Python 3 (command line: python3)
- GNU make (usually installed by default on Mac/Linux systems)
- openssl (command line tool) (for generating SSL certificate)

### Download Instructions

Run

    git clone https://github.com/Junior-Design/Roundtable-web.git

to clone the repository.

### Usage

    make setup      # Set up dev environment (installs necessary dependencies)
    make setupwin   # Set up dev environment on Windows
    make bundle     # Generates bundled ReactJS JavaScript file
    make run        # Run server (without encryption)
    make runhttps   # Run server using https
    make genssl     # Generates a new self-signed SSL certificate (openssl)
    make clean      # Removes results of `make bundle` (doesn't work on Windows)

Be sure to generate an SSL certificate before trying to run the https version of the server.

In general, to get running the quickest, run these commands in the following order:

    make setup
    make bundle
    make run

Once the server is running, you don't have to shut it off in order to re-bundle (in a different terminal) the front-end code.

Navigate to either http://localhost:3000/ or https://localhost:3000/ (depending on whether https is being run) to view and interact with the website.

### Project Layout

- The **public** directory contains files publicly accessible to anyone and served as plain files by the web server.
- The **react** directory contains the front-end source code.
    + New webpage routes can be added in **react/routes.jsx**.
    + The entrypoint is **react/app-client.jsx**.
- The **server** directory contains the source-code for the web server.
    + The entrypoint is **server/server.py**.
    + New api/non-webpage routes can be added in this file.

### Troubleshooting / Common Errors

- If `make bundle` or `make run` are failing
    - Ensure that all of the dependencies are installed. (Use `make setup` or `make setupwin`.)
- If `make setup` is failing
    - Try running `sudo make setup` to give raised permission to install certain dependencies.
    - Try updating PIP to the latest version. (`python3 -m pip install --upgrade pip`)
    - If you are using Windows, use `make setupwin` instead.
- If `make setupwin` is failing
    - Try running command line in "Administrator Mode" to give raised permission to install certain dependencies.
    - Try updating PIP to the latest version. (`python3 -m pip install --upgrade pip`)
    - If you are using Mac/Linux, use `make setup` instead.
- If you cannot connect to the website after running the server
    - Ensure that you are connecting using the correct protocol (http vs. https)
    - Ensure that you are connecting to the correct port (port 3000 in the URL)

### License

[MIT License](LICENSE)
