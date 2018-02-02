require 'test_helper'

class PracticeControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

end
