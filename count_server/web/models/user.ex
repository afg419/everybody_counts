defmodule CountServer.User do
  use CountServer.Web, :model

  schema "users" do
    field :username, :string
    field :password, :string
    field :top_score, :integer
    
    timestamps
  end

  @required_fields ~w(username password)
  @optional_fields ~w()

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:username)
  end
end
