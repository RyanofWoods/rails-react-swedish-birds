require 'test_helper'

class Api::BirdsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @family = families(:woodpeckers)
    @user = users(:ryan)
    @user.observations.create!(bird: birds(:great_spotted_woodpecker), observed_at: '2022-01-01', note: 'note')
    @user.observations.create!(bird: birds(:green_woodpecker), observed_at: '2022-01-01')
    @other_user = users(:sara)
    @other_user.observations.create!(bird: birds(:great_spotted_woodpecker), observed_at: '2022-01-02')
    @other_user.observations.create!(bird: birds(:white_backed_woodpecker), observed_at: '2022-01-02')
  end

  test 'GET #index returns an unauthorized response if not logged in' do
    get api_birds_url

    assert_response :unauthorized
    expected = { 'error'=> 'You need to sign in or sign up before continuing.' }
    assert_equal(expected, json_response)
  end

  test 'GET #index returns all birds with any user observations joined on' do
    sign_in @user

    get api_birds_url

    assert_response :success
    expected_birds = [
      {
        'scientificName'=> birds(:great_spotted_woodpecker).scientific_name,
        'englishName'=> birds(:great_spotted_woodpecker).english_name,
        'swedishName'=> birds(:great_spotted_woodpecker).swedish_name,
        'familyScientificName'=> birds(:great_spotted_woodpecker).family.scientific_name,
        'orderScientificName'=> birds(:great_spotted_woodpecker).family.order.scientific_name,
        'details'=> birds(:great_spotted_woodpecker).details,
        'populationCategory'=> birds(:great_spotted_woodpecker).population_category,
        'seen'=> true,
        'observation'=> {
          'observedAt'=> '2022-01-01',
          'note'=> 'note'
        }
      },
      {
        'scientificName'=> birds(:green_woodpecker).scientific_name,
        'englishName'=> birds(:green_woodpecker).english_name,
        'swedishName'=> birds(:green_woodpecker).swedish_name,
        'familyScientificName'=> birds(:green_woodpecker).family.scientific_name,
        'orderScientificName'=> birds(:green_woodpecker).family.order.scientific_name,
        'details'=>  birds(:green_woodpecker).details,
        'populationCategory'=>  birds(:green_woodpecker).population_category,
        'seen'=> true,
        'observation'=> {
          'observedAt'=> '2022-01-01',
          'note'=> nil
        }
      },
      {
        'scientificName'=> birds(:white_backed_woodpecker).scientific_name,
        'englishName'=> birds(:white_backed_woodpecker).english_name,
        'swedishName'=> birds(:white_backed_woodpecker).swedish_name,
        'familyScientificName'=> birds(:white_backed_woodpecker).family.scientific_name,
        'orderScientificName'=> birds(:white_backed_woodpecker).family.order.scientific_name,
        'details'=>  birds(:white_backed_woodpecker).details,
        'populationCategory'=>  birds(:white_backed_woodpecker).population_category,
        'seen'=> false
      }
    ]

    actual_birds = json_response['birds']
    expected_birds.each { |bird| assert_includes(actual_birds, bird) }
  end
end
