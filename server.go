package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// Serves ReactJS website located at `entryFile`
func indexHandler(entryFile string) func(w http.ResponseWriter, r *http.Request) {
	fn := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, entryFile)
	}
	return http.HandlerFunc(fn)
}

func createRoutes() *mux.Router {
	r := mux.NewRouter()

	// Routes are matched from top to bottom.

	// Ping
	r.HandleFunc("/ping", func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(w, "pong")
	})

	// Handle API requests
	r.HandleFunc("/test_api_route", func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(w, "test_api_route response")
	})

	// Handle static asset requests
	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("assets/"))))

	// Handle ReactJS bundle.js
	r.HandleFunc("/bundle.js", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/bundle.js")
	})
	// Handle ReactJS website - index.html
	r.PathPrefix("/").HandlerFunc(indexHandler("static/index.html"))

	return r
}

func main() {
	port := "443"
	router := createRoutes()

	// Serve HTTPS
	fmt.Println("Listening on port:", port)
	err := http.ListenAndServeTLS(":"+port, "server.crt", "server.key", router)
	if err != nil {
		log.Fatal("ListenAndServeTLS: ", err)
	}

}
