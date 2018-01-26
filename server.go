package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/zmb3/spotify"
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

	// request a Spotify Authentication session
	r.HandleFunc("/spotify-auth", func(w http.ResponseWriter, r *http.Request) {

		redirectUrl := "https://localhost:443" // after the auth is complete, Spotify will redirect the user to this url
		// ^^ once we implement this on the front-end, this'll need to change to a specific post-auth page

		auth := spotify.NewAuthenticator(redirectUrl, spotify.ScopeUserReadPrivate)

		auth.SetAuthInfo(
			"1bfb013a55474809b040bd6934ff7ee5",
			"53eb0eba01dd44aebaa0414d550b2aaa")

		// get a redirect url, which is of the format "https://accounts.spotify.com/authorize...."
		userSessionIdentifier := uuid.New().String()
		spotifyAuthUrl := auth.AuthURL(userSessionIdentifier)

		// we need to send the redirect url back to the web frontend, so the user can be actually redirected
		type Response struct {
			AuthenticationUrl string `json: authUrl`
		}

		json, _ := json.Marshal(Response{spotifyAuthUrl})

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(json)
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
