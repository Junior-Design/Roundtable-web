
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

runhttps :
	@python3 server/server.py --https

genssl :
	openssl ecparam -genkey -name secp384r1 -out server.key
	openssl req -new -x509 -sha256 -key server.key -out server.crt -days 3650

# UNIX only :(
clean :
	@rm -f public/static/bundle.js
	@rm -f npm-debug.log
	@echo Done.
