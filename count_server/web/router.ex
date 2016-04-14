defmodule CountServer.Router do
  use CountServer.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CountServer do
    pipe_through :browser

    get "/", HomeController, :index
  end

  scope "/api/v1", CountServer do
    pipe_through :api
    delete "/sessions", SessionController, :destroy
    resources "/sessions", SessionController, only: [:new, :create, :index]
  end
end
