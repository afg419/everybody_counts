defmodule CountServer.SessionView do
  use CountServer.Web, :view
  # def render("index.json", %{reply: reply}) do
  #   reply
  # end

  def render(_action, %{reply: reply}), do: reply

  # def render("new.json", %{reply: reply}) do
  #   reply
  # end
  #
  # def render("create.json", %{reply: reply}) do
  #   reply
  # end
  #
  # def render("destroy.json", %{reply: reply}) do
  #   reply
  # end
  #
end
