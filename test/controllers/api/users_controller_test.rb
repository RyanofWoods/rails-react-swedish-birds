require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:ryan)
  end

  test 'GET #show returns the correct value when logged in' do
    sign_in @user

    get api_users_url

    assert_response :ok
    expected = { 'isLoggedIn' => true }
    assert_equal(expected, json_response)
  end

  test 'GET #show returns the correct value when logged out' do
    get api_users_url

    assert_response :ok
    expected = { 'isLoggedIn' => false }
    assert_equal(expected, json_response)
  end
end
