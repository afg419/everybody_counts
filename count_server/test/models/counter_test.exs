defmodule CountServer.CounterTest do
  use CountServer.ModelCase

  alias CountServer.Counter

  @valid_attrs %{main: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Counter.changeset(%Counter{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Counter.changeset(%Counter{}, @invalid_attrs)
    refute changeset.valid?
  end
end
