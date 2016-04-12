defmodule CountServer.CounterController do
  use CountServer.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
