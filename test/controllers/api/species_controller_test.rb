require 'test_helper'

class Api::SpeciesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @family = families(:woodpeckers)
    @user = users(:ryan)
  end

  test 'GET #index returns all species when not logged in' do
    get api_species_index_url

    assert_response :success
    expected_species = [
      {
        'scientificName' => species(:great_spotted_woodpecker).scientific_name,
        'englishName' => species(:great_spotted_woodpecker).english_name,
        'swedishName' => species(:great_spotted_woodpecker).swedish_name,
        'familyScientificName' => species(:great_spotted_woodpecker).family.scientific_name,
        'orderScientificName' => species(:great_spotted_woodpecker).family.order.scientific_name,
        'details' => species(:great_spotted_woodpecker).details,
        'populationCategory' => species(:great_spotted_woodpecker).population_category
      },
      {
        'scientificName' => species(:green_woodpecker).scientific_name,
        'englishName' => species(:green_woodpecker).english_name,
        'swedishName' => species(:green_woodpecker).swedish_name,
        'familyScientificName' => species(:green_woodpecker).family.scientific_name,
        'orderScientificName' => species(:green_woodpecker).family.order.scientific_name,
        'details' => species(:green_woodpecker).details,
        'populationCategory' => species(:green_woodpecker).population_category
      },
      {
        'scientificName' => species(:white_backed_woodpecker).scientific_name,
        'englishName' => species(:white_backed_woodpecker).english_name,
        'swedishName' => species(:white_backed_woodpecker).swedish_name,
        'familyScientificName' => species(:white_backed_woodpecker).family.scientific_name,
        'orderScientificName' => species(:white_backed_woodpecker).family.order.scientific_name,
        'details' => species(:white_backed_woodpecker).details,
        'populationCategory' => species(:white_backed_woodpecker).population_category
      }
    ]

    actual_species = json_response['species']
    assert_serialized_array(expected_species, actual_species, 'englishName')
  end

  test 'GET #index returns all species when logged in' do
    sign_in @user

    get api_species_index_url

    assert_response :success
    expected_species = [
      {
        'scientificName' => species(:great_spotted_woodpecker).scientific_name,
        'englishName' => species(:great_spotted_woodpecker).english_name,
        'swedishName' => species(:great_spotted_woodpecker).swedish_name,
        'familyScientificName' => species(:great_spotted_woodpecker).family.scientific_name,
        'orderScientificName' => species(:great_spotted_woodpecker).family.order.scientific_name,
        'details' => species(:great_spotted_woodpecker).details,
        'populationCategory' => species(:great_spotted_woodpecker).population_category
      },
      {
        'scientificName' => species(:green_woodpecker).scientific_name,
        'englishName' => species(:green_woodpecker).english_name,
        'swedishName' => species(:green_woodpecker).swedish_name,
        'familyScientificName' => species(:green_woodpecker).family.scientific_name,
        'orderScientificName' => species(:green_woodpecker).family.order.scientific_name,
        'details' => species(:green_woodpecker).details,
        'populationCategory' => species(:green_woodpecker).population_category
      },
      {
        'scientificName' => species(:white_backed_woodpecker).scientific_name,
        'englishName' => species(:white_backed_woodpecker).english_name,
        'swedishName' => species(:white_backed_woodpecker).swedish_name,
        'familyScientificName' => species(:white_backed_woodpecker).family.scientific_name,
        'orderScientificName' => species(:white_backed_woodpecker).family.order.scientific_name,
        'details' => species(:white_backed_woodpecker).details,
        'populationCategory' => species(:white_backed_woodpecker).population_category
      }
    ]

    actual_species = json_response['species']
    assert_serialized_array(expected_species, actual_species, 'englishName')
  end
end
