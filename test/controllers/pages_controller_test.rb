require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test 'success if logged in' do
    sign_in users(:ryan)
    get '/'
    assert_response :success
  end

  test 'redirected to login if not logged in' do
    get '/'
    assert_redirected_to controller: 'devise/sessions', action: 'new'
  end
end
