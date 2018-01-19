
bundle :
	@npm run bundle
	@echo Done.

runserver run :
	@go run server.go

ssl :
	openssl ecparam -genkey -name secp384r1 -out server.key
	openssl req -new -x509 -sha256 -key server.key -out server.crt -days 3650

setup :
	npm install
	go get -u github.com/gorilla/mux
	@echo Setup complete.

# UNIX only :(
clean :
	@rm -f static/bundle.js
	@rm -f npm-debug.log
	@echo Done.
