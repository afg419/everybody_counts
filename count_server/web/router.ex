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

    get "/", HomeController, :index
  end

  scope "/api/v1", CountServer do
    pipe_through :api

    # get "/session/confirm_auth", SessionController, :show
    # get "/session", SessionController, :new
    # post "/session", SessionController, :create
    delete "/sessions", SessionController, :destroy
    resources "/sessions", SessionController, only: [:new, :create, :index]
  end
end
