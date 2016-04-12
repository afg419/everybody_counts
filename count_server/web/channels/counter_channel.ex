defmodule CountServer.CounterChannel do
  use Phoenix.Channel

  def join("the_counter", _message, socket) do
    {:ok, socket}
  end

  def handle_in("count_up", %{"body" => body}, socket) do
    broadcast! socket, "count_up", %{body: body}
    {:noreply, socket}
  end

  # def handle_out("count_up", payload, socket) do
  #   push socket, "new_msg", payload
  #   {:noreply, socket}
  # end
end
