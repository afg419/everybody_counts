defmodule CountServer.UserTest do
  use CountServer.ModelCase

  alias CountServer.User
  alias CountServer.Repo

  @valid_attrs %{password: "some content", username: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  # test "changeset is invalid if password and confirmation do not match" do
  #   changeset = User.changeset(%User{}, %{email: "test@test.com", password: "foo", password_confirmation: "bar", username: "test"})
  #   refute changeset.valid?
  # end

  test "changeset is invalid if username is used already" do
    %User{}
    |> User.changeset(%{username: "axeface", password: "password"})
    |> Repo.insert!

    user2 =
      %User{}
      |> User.changeset(%{username: "axeface", password: "password2"})
    assert {:error, changeset} = Repo.insert(user2)
    assert changeset.errors[:username] == "has already been taken"
  end
end
