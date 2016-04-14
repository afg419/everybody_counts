defmodule CountServer.HomeController do
  use CountServer.Web, :controller
  alias CountServer.Counter

  def index(conn, _params) do
    render( conn, "index.html", counter: Repo.get(Counter, 1) )
  end
end
