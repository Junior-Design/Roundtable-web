
bundle :
	@npm run bundle
	@echo Done.

runserver run :
	@go python3 server.py

ssl :
	openssl ecparam -genkey -name secp384r1 -out server.key
	openssl req -new -x509 -sha256 -key server.key -out server.crt -days 3650

setup :
	npm install
	pip3 install -r requirements.txt
	@echo Setup complete.

# UNIX only :(
clean :
	@rm -f public/static/bundle.js
	@rm -f npm-debug.log
	@echo Done.
