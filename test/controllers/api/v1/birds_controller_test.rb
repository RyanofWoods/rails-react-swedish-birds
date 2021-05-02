require 'test_helper'

class Api::V1::BirdsControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get api_v1_birds_update_url
    assert_response :success
  end

end
