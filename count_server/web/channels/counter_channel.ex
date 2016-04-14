require IEx

defmodule CountServer.CounterChannel do
  use Phoenix.Channel
  alias CountServer.Counter
  alias CountServer.Repo
  alias CountServer.User

  def join("the_counter", _message, socket) do
    {:ok, socket}
  end

  def handle_in("count_up", %{"username" => username}, socket) do
    counter = Repo.get!(Counter, 1)
    score = counter.main

    Repo.get_by(User, username: username)
      |> Ecto.Changeset.change( top_score: score)
      |> Repo.update

    new_value = 0
    changeset = Counter.changeset(counter, %{main: new_value})

    case Repo.update(changeset) do
    {:error, changeset} ->
      broadcast! socket, "count_up", %{body: false}
    changeset ->
      broadcast! socket, "count_up", %{body: new_value}
    end

    {:noreply, socket}
  end

  def handle_in("timer", _params, socket) do
    counter = Repo.get!(Counter, 1)
    new_value = counter.main + 1

    changeset = Counter.changeset(counter, %{main: new_value})

    case Repo.update(changeset) do
    {:error, changeset} ->
      broadcast! socket, "timer", %{body: false}
    changeset ->
      broadcast! socket, "timer", %{body: new_value}
    end

    {:noreply, socket}
  end

  # def handle_out("count_up", payload, socket) do
  #   push socket, "new_msg", payload
  #   {:noreply, socket}
  # end
end
