require IEx

defmodule CountServer.SessionController do
  use CountServer.Web, :controller

  alias CountServer.Repo
  alias CountServer.User
  alias CountServer.AppState

  alias Comeonin.Bcrypt

  def index(conn, _params) do
    user = conn
      |> fetch_session
      |> AppState.current_user

    if user do
      render(conn, reply: %{username: user.username, top_score: user.top_score})
    else
      render(conn, reply: false)
    end
  end

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

  def destroy(conn, _params) do
    fetched_conn = conn
    |> fetch_session
    |> put_session(:user_id, nil)

    case AppState.current_user(fetched_conn) do
      nil ->
        fetched_conn
        |> render(reply: true)
      user ->
        fetched_conn
        |> render(reply: false)
    end
  end

  def authenticate(user, password) do
    case user do
      nil -> false
      user -> Bcrypt.checkpw(password, user.password)
    end
  end
end
