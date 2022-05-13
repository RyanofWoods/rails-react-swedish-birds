require 'test_helper'

class Api::ObservationControllerTest < ActionDispatch::IntegrationTest
  setup do
    new_bird = Bird.create(scientific_name: 'Neo', english_name: 'New', swedish_name: 'Ny', population_category: 1, family: families(:tits))
    @bird_id = new_bird.scientific_name
    @user = users(:ryan)
    @today = Date.today
    @observed_at = @today.to_s
  end

  test 'POST #create returns an unauthorized response if there is no logged in user' do
    post api_bird_observations_url(@bird_id)

    assert_response :unauthorized
    expected = { 'error'=> 'You need to sign in or sign up before continuing.' }
    assert_equal(expected, json_response)
  end

  test 'POST #create throws an error when the given bird scientific name is invalid' do
    sign_in @user

    post api_bird_observations_url('Invalid name')

    assert_response :bad_request
    expected = { 'error'=> 'Cannot find a bird with the scientific name of Invalid name.' }
    assert_equal(expected, json_response)
  end

  test 'POST #create throws an error when observed_at is not a date or 0' do
    sign_in @user
    observed_at = nil

    post api_bird_observations_url(@bird_id, params: { observed_at: nil })

    assert_response :bad_request
    expected = { 'error'=> 'Observed at must be a Date or zero.' }
    assert_equal(expected, json_response)
  end

  test 'POST #create creates an observation for the logged in user' do
    sign_in @user
    note = 'First observation notes'

    assert_difference('@user.observations.count', 1) do
      post api_bird_observations_url(@bird_id, params: { note: note, observed_at: @observed_at })
    end
    observation = @user.observations.last
    assert_response :success
    expected = {
      "details"=>nil,
      "populationCategory"=>1,
      "scientificName"=>"Neo",
      "englishName"=>"New",
      "swedishName"=>"Ny",
      "familyScientificName"=>"Paridae",
      "orderScientificName"=>"Passeriformes",
      "seen"=>true,
      "observation"=> {
        'note'=>note,
        'observedAt'=>@observed_at
      }
    }
    assert_equal(@today, observation.observed_at)
    assert_equal(expected, json_response)
  end

  test 'POST #create creates an observation even without a given note' do
    sign_in @user

    assert_difference('@user.observations.count', 1) do
      post api_bird_observations_url(@bird_id, params: { observed_at: @observed_at })
    end
    assert_response :success
    expected = {
      "details"=>nil,
      "populationCategory"=>1,
      "scientificName"=>"Neo",
      "englishName"=>"New",
      "swedishName"=>"Ny",
      "familyScientificName"=>"Paridae",
      "orderScientificName"=>"Passeriformes",
      "seen"=>true,
      "observation"=> {
        'note'=>nil,
        'observedAt'=>@observed_at
      }
    }
    assert_equal(expected, json_response)
  end
end
