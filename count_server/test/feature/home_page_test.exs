require IEx

defmodule CountServer.HomePageTest do
  use CountServer.ConnCase

  use Hound.Helpers

  hound_session

  test "GET /" do
    navigate_to "/"
    element = find_element(:name, "create-account")
    # fill_field(element, "Happy Birthday ~!")
    assert(page_title() == "Create Account")
    assert 1 == 1
  end
end
