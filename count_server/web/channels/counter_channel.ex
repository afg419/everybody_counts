require IEx

defmodule CountServer.CounterChannel do
  use Phoenix.Channel
  alias CountServer.Counter
  alias CountServer.Repo

  def join("the_counter", _message, socket) do
    {:ok, socket}
  end

  def handle_in("count_up", _params, socket) do
    counter = Repo.get!(Counter, 1)
    new_value = counter.main + 1

    changeset = Counter.changeset(counter, %{main: new_value})


    # post = MyRepo.get!(Post, 42)
    # post = Ecto.Changeset.change post, title: "New title"
    # case MyRepo.update post do
    #   {:ok, model}        -> # Updated with success
    #   {:error, changeset} -> # Something went wrong
    # end

    case Repo.update(changeset) do
    {:error, changeset} ->
      broadcast! socket, "count_up", %{body: false}
    changeset ->
      broadcast! socket, "count_up", %{body: new_value}
    end

    {:noreply, socket}
  end

  # def handle_out("count_up", payload, socket) do
  #   push socket, "new_msg", payload
  #   {:noreply, socket}
  # end
end
