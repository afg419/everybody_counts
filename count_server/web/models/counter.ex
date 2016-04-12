defmodule CountServer.Counter do
  use CountServer.Web, :model

  schema "counters" do
    field :main, :integer, default: 0

    timestamps
  end

  @required_fields ~w(main)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
