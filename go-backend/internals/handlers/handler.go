package handlers

import "net/http"

type Handler interface {
	Routes() http.Handler
}
