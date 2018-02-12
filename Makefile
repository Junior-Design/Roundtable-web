
setup :
	@echo Installing server dependencies...
	@((npm install) && (pip3 install -q -r server/dependencies.txt) && (echo Setup successful)) || (echo Try again with Sudo enabled)

# Command Prompt - Run as administrator
setupwin :
	@echo Installing server dependencies...
	npm install
	pip3 install -q -r server/dependencies.txt

bundle :
	@npm run bundle
	@echo Done.

runserver run :
	@python3 server/server.py

# UNIX only :(
clean :
	@rm -f public/static/bundle.js
	@rm -f npm-debug.log
	@echo Done.
