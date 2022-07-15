require 'test_helper'

class Api::FamiliesControllerTest < ActionDispatch::IntegrationTest

  test 'GET #index returns all the Families if not logged in' do
    get api_families_url

    assert_response :success
    actual = json_response['families']
    assert_equal(actual.size, Family.all.size)
  end

  test 'GET #index returns all the Families' do
    sign_in users(:ryan)

    get api_families_url

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
