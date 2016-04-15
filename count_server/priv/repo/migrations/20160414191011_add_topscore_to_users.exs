defmodule CountServer.Repo.Migrations.AddTopscoreToUsers do
  use Ecto.Migration

  def change do
     alter table(:users) do
      add :top_score, :integer
    end
  end
end
