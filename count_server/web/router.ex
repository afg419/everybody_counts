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
    pipe_through :browser # Use the default browser stack

    # get "/", CounterController, :index
    get "/", HomeController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", CountServer do
    pipe_through :api

    get "/session", SessionController, :new
    # resources "/sessions", SessionController, only: [:new, :create]
  end
end
