defmodule CountServer.SessionController do
  use CountServer.Web, :controller
  alias CountServer.Repo
  alias CountServer.User

  def new(conn, %{"password" => password, "username" => username}) do
    changeset = %User{}
    |> User.changeset(%{password: password, username: username})

    fetched_conn = conn
    |> fetch_session
    |> fetch_flash

    case Repo.insert(changeset) do
      {:ok, user} ->
        fetched_conn
        |> put_session(:user_id, user.id)
        |> put_flash(:info, "Logged in #{user.username} successfully.")
        |> render(reply: "user successfuly created")
      {:error, changeset} ->
        fetched_conn
        |> put_flash(:error, "username #{changeset.errors[:username]}")
        |> render(reply: "username #{changeset.errors[:username]}")
    end
  end
  #
  # changeset = User.changeset(%User{}, user_params)
  # case Repo.insert(changeset) do
  # end

end
