defmodule CountServer.SessionView do
  use CountServer.Web, :view

  def render("new.json", %{reply: reply}) do
    reply
  end
end
