require 'test_helper'

class Api::BirdsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @family = families(:woodpeckers)
    @user = users(:ryan)
  end

  test 'GET #index returns all birds when not logged in' do
    get api_birds_url

    assert_response :success
    expected_birds = [
      {
        'scientificName' => birds(:great_spotted_woodpecker).scientific_name,
        'englishName' => birds(:great_spotted_woodpecker).english_name,
        'swedishName' => birds(:great_spotted_woodpecker).swedish_name,
        'familyScientificName' => birds(:great_spotted_woodpecker).family.scientific_name,
        'orderScientificName' => birds(:great_spotted_woodpecker).family.order.scientific_name,
        'details' => birds(:great_spotted_woodpecker).details,
        'populationCategory' => birds(:great_spotted_woodpecker).population_category
      },
      {
        'scientificName' => birds(:green_woodpecker).scientific_name,
        'englishName' => birds(:green_woodpecker).english_name,
        'swedishName' => birds(:green_woodpecker).swedish_name,
        'familyScientificName' => birds(:green_woodpecker).family.scientific_name,
        'orderScientificName' => birds(:green_woodpecker).family.order.scientific_name,
        'details' => birds(:green_woodpecker).details,
        'populationCategory' => birds(:green_woodpecker).population_category
      },
      {
        'scientificName' => birds(:white_backed_woodpecker).scientific_name,
        'englishName' => birds(:white_backed_woodpecker).english_name,
        'swedishName' => birds(:white_backed_woodpecker).swedish_name,
        'familyScientificName' => birds(:white_backed_woodpecker).family.scientific_name,
        'orderScientificName' => birds(:white_backed_woodpecker).family.order.scientific_name,
        'details' => birds(:white_backed_woodpecker).details,
        'populationCategory' => birds(:white_backed_woodpecker).population_category
      }
    ]

    actual_birds = json_response['birds']
    assert_serialized_array(expected_birds, actual_birds, 'englishName')
  end

  test 'GET #index returns all birds when logged in' do
    sign_in @user

    get api_birds_url

    assert_response :success
    expected_birds = [
      {
        'scientificName' => birds(:great_spotted_woodpecker).scientific_name,
        'englishName' => birds(:great_spotted_woodpecker).english_name,
        'swedishName' => birds(:great_spotted_woodpecker).swedish_name,
        'familyScientificName' => birds(:great_spotted_woodpecker).family.scientific_name,
        'orderScientificName' => birds(:great_spotted_woodpecker).family.order.scientific_name,
        'details' => birds(:great_spotted_woodpecker).details,
        'populationCategory' => birds(:great_spotted_woodpecker).population_category
      },
      {
        'scientificName' => birds(:green_woodpecker).scientific_name,
        'englishName' => birds(:green_woodpecker).english_name,
        'swedishName' => birds(:green_woodpecker).swedish_name,
        'familyScientificName' => birds(:green_woodpecker).family.scientific_name,
        'orderScientificName' => birds(:green_woodpecker).family.order.scientific_name,
        'details' => birds(:green_woodpecker).details,
        'populationCategory' => birds(:green_woodpecker).population_category
      },
      {
        'scientificName' => birds(:white_backed_woodpecker).scientific_name,
        'englishName' => birds(:white_backed_woodpecker).english_name,
        'swedishName' => birds(:white_backed_woodpecker).swedish_name,
        'familyScientificName' => birds(:white_backed_woodpecker).family.scientific_name,
        'orderScientificName' => birds(:white_backed_woodpecker).family.order.scientific_name,
        'details' => birds(:white_backed_woodpecker).details,
        'populationCategory' => birds(:white_backed_woodpecker).population_category
      }
    ]

    actual_birds = json_response['birds']
    assert_serialized_array(expected_birds, actual_birds, 'englishName')
  end
end
