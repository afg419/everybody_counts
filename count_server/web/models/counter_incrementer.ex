defmodule CountServer.CounterIncrementer do
  alias CountServer.Repo
  alias CountServer.Counter
  def start_link do
    pid = spawn_link __MODULE__, :loop, []
    {:ok, pid}
  end

  def loop do
    counter = Repo.get!(Counter, 1)
    new_value = counter.main + 1
    Counter.changeset(counter, %{main: new_value})
    |> Repo.update

    CountServer.Endpoint.broadcast! "the_counter", "timer", %{body: new_value}

    IO.puts new_value

    :timer.sleep(1000)
    loop
  end
end
