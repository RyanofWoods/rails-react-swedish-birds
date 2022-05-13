require 'test_helper'

class Api::SearchControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:ryan)
  end

  test 'POST #create returns an unauthorized response if there is no logged in user' do
    get api_search_url(query: 'tit')

    assert_response :unauthorized
    expected = { 'error'=> 'You need to sign in or sign up before continuing.' }
    assert_equal(expected, json_response)
  end

  test 'GET #index returns all the matching bird scientific names' do
    sign_in @user

    get api_search_url(query: 'tit')

    birds = Bird.search_by_all_names('tit')
    expected = { 'birds'=> birds.pluck(:scientific_name) }
    assert_equal(expected, json_response)
  end
end
