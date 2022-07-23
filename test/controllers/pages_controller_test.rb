require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test 'success if logged in' do
    sign_in users(:ryan)
    get '/'
    assert_response :success
  end

  test 'success if not logged in' do
    get '/'
    assert_response :success
  end
end
