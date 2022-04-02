require 'test_helper'

class Api::V1::FamiliesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @family = families(:woodpeckers)
    @user = users(:ryan)
    @user.observations.create!(bird: birds(:great_spotted_woodpecker), observed_at: '2022-01-01', note: 'note')
    @user.observations.create!(bird: birds(:green_woodpecker), observed_at: '2022-01-01')
    @other_user = users(:sara)
    @other_user.observations.create!(bird: birds(:great_spotted_woodpecker), observed_at: '2022-01-02')
    @other_user.observations.create!(bird: birds(:white_backed_woodpecker), observed_at: '2022-01-02')
  end

  test 'GET #show returns the family with its birds and any user observations joined on' do
    sign_in @user

    get api_v1_family_url(@family.scientific_name)

    assert_response :success
    expected = {
      'total_birds'=> 3,
      'total_seen'=> 2,
      'group_scientific_name'=> @family.scientific_name,
      'group_english_name'=> @family.english_name,
      'group_swedish_name'=> @family.swedish_name,
      'birds'=> [
        {
          'scientific_name'=> birds(:great_spotted_woodpecker).scientific_name,
          'english_name'=> birds(:great_spotted_woodpecker).english_name,
          'swedish_name'=> birds(:great_spotted_woodpecker).swedish_name,
          'details'=> birds(:great_spotted_woodpecker).details,
          'seen'=> true
        },
        {
          'scientific_name'=> birds(:green_woodpecker).scientific_name,
          'english_name'=> birds(:green_woodpecker).english_name,
          'swedish_name'=> birds(:green_woodpecker).swedish_name,
          'details'=>  birds(:green_woodpecker).details,
          'seen'=> true
        },
        {
          'scientific_name'=> birds(:white_backed_woodpecker).scientific_name,
          'english_name'=> birds(:white_backed_woodpecker).english_name,
          'swedish_name'=> birds(:white_backed_woodpecker).swedish_name,
          'details'=>  birds(:white_backed_woodpecker).details,
          'seen'=> false
        }
      ],
    }
    assert_equal(expected, json_response)
  end
end
