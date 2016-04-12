require IEx

defmodule CountServer.HomePageTest do
  use CountServer.ConnCase

  use Hound.Helpers

  hound_session

  test "GET /" do
    navigate_to "/"
    assert 1 =~ 1
  end
end
