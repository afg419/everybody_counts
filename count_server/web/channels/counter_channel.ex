defmodule CountServer.CounterChannel do
  use Phoenix.Channel

  def join("the_counter", _message, socket) do
    {:ok, socket}
  end


end
