require 'test_helper'

class Api::OrdersControllerTest < ActionDispatch::IntegrationTest

  test 'GET #index returns an unauthorized response if not logged in' do
    get api_orders_url

    assert_response :unauthorized
    expected = { 'error'=> 'You need to sign in or sign up before continuing.' }
    assert_equal(expected, json_response)
  end

  test 'GET #index returns all the Orders' do
    sign_in users(:ryan)

    get api_orders_url

    assert_response :success
    actual = json_response['orders']
    assert_equal(actual.size, Order.all.size)

    expected = {
      'scientificName'=> orders(:owls).scientific_name,
      'englishName'=> orders(:owls).english_name,
      'swedishName'=> orders(:owls).swedish_name,
    }
    assert_includes(actual, expected)
    expected = {
      'scientificName'=> orders(:woodpeckers_and_alies).scientific_name,
      'englishName'=> orders(:woodpeckers_and_alies).english_name,
      'swedishName'=> orders(:woodpeckers_and_alies).swedish_name,
    }
    assert_includes(actual, expected)
  end
end
