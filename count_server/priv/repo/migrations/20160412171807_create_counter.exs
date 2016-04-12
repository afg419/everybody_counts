defmodule CountServer.Repo.Migrations.CreateCounter do
  use Ecto.Migration

  def change do
    create table(:counters) do
      add :main, :integer, default: 0

      timestamps
    end

  end
end
