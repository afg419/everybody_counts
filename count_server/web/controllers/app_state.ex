defmodule CountServer.AppState do
  use CountServer.Web, :controller

  def current_user(conn) do
    if id = get_session(conn, :user_id) do
      Repo.get!(Risk.User, id)
    end
  end
end
