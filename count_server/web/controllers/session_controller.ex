defmodule CountServer.SessionController do
  use CountServer.Web, :controller
  alias CountServer.Repo
  alias CountServer.User
  alias Comeonin.Bcrypt

  def new(conn, %{"password" => password, "username" => username}) do
    changeset = %User{}
    |> User.changeset(%{password: Bcrypt.hashpwsalt(password), username: username})

    fetched_conn = conn
    |> fetch_session

    case Repo.insert(changeset) do
      {:ok, user} ->
        fetched_conn
        |> put_session(:user_id, user.id)
        |> render(reply: true)
      {:error, changeset} ->
        fetched_conn
        |> render(reply: false)
    end
  end

  def create(conn, %{"password" => password, "username" => username}) do
    user = Repo.get_by(User, username: username)

    fetched_conn = conn
    |> fetch_session

    case authenticate(user, password) do
      false ->
        fetched_conn
        |> render(reply: false)
      true ->
        fetched_conn
        |> put_session(:user_id, user.id)
        |> render(reply: true)
    end
  end

  def authenticate(user, password) do
    case user do
      nil -> false
      user -> Bcrypt.checkpw(password, user.password)
    end
  end

end
