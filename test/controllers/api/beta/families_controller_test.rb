require 'test_helper'

class Api::Beta::FamiliesControllerTest < ActionDispatch::IntegrationTest

  test 'GET #index returns an unauthorized response if not logged in' do
    get api_beta_families_url

    assert_response :unauthorized
    expected = { 'error'=> 'You need to sign in or sign up before continuing.' }
    assert_equal(expected, json_response)
  end

  test 'GET #index returns all the Families' do
    sign_in users(:ryan)

    get api_beta_families_url

    assert_response :success
    actual = json_response['families']
    assert_equal(actual.size, Family.all.size)

    expected = {
      'scientificName'=> families(:woodpeckers).scientific_name,
      'englishName'=> families(:woodpeckers).english_name,
      'swedishName'=> families(:woodpeckers).swedish_name,
      'orderScientificName'=> families(:woodpeckers).order.scientific_name
    }
    assert_includes(actual, expected)
    expected = {
      'scientificName'=> families(:tits).scientific_name,
      'englishName'=> families(:tits).english_name,
      'swedishName'=> families(:tits).swedish_name,
      'orderScientificName'=> families(:tits).order.scientific_name
    }
    assert_includes(actual, expected)
  end
end
