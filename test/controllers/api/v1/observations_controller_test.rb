require 'test_helper'

class Api::V1::ObservationControllerTest < ActionDispatch::IntegrationTest
  setup do
    new_bird = Bird.create(scientific_name: 'Neo', english_name: 'New', swedish_name: 'Ny', population_category: 1, family: families(:tits))
    @bird_id = new_bird.scientific_name
    @user = users(:ryan)
    @today = Date.today
    @observed_at = @today.to_s
  end

  test 'POST #create throws a bad request error if the given bird is invalid' do
    sign_in @user

    post api_v1_bird_observations_url('Invalid name')

    assert_response :bad_request
    expected = { 'error'=> 'Bad request' }
    assert_equal(expected, json_response)
  end

  test 'POST #create throws a bad request error when observed_at is not a date or 0' do
    sign_in @user
    observed_at = nil

    post api_v1_bird_observations_url(@bird_id, params: { observed_at: nil })

    assert_response :bad_request
    expected = { 'error'=> 'Observed at must be a Date or zero.' }
    assert_equal(expected, json_response)
  end

  test 'POST #create successfully creates an observation for the logged in user' do
    sign_in @user
    note = 'First observation notes'

    assert_difference('@user.observations.count', 1) do
      post api_v1_bird_observations_url(@bird_id, params: { note: note, observed_at: @observed_at })
    end
    observation = @user.observations.last
    assert_response :success
    expected = { 'bird_scientific_name'=> 'Neo', 'bird_order_scientific_name'=> 'Passeriformes', 'bird_family_scientific_name'=> 'Paridae', 'note'=>note, 'observed_at'=> @observed_at, 'seen'=> true }
    assert_equal(@today, observation.observed_at)
    assert_equal(expected, json_response)
  end

  test 'POST #create successfully creates an observation even without a given note' do
    sign_in @user

    assert_difference('@user.observations.count', 1) do
      post api_v1_bird_observations_url(@bird_id, params: { observed_at: @observed_at })
    end
    assert_response :success
    expected = { 'bird_scientific_name'=> 'Neo', 'bird_order_scientific_name'=> 'Passeriformes', 'bird_family_scientific_name'=> 'Paridae', 'note'=>nil, 'observed_at'=> @observed_at, 'seen'=> true }
    assert_equal(expected, json_response)
  end

  test 'POST #create returns an unauthorized response if not logged in' do
    post api_v1_bird_observations_url(@bird_id)

    assert_response :unauthorized
    expected = { 'error'=> 'You need to sign in or sign up before continuing.' }
    assert_equal(expected, json_response)
  end
end
