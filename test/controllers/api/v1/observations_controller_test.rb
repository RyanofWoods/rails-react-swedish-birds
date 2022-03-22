require 'test_helper'

class Api::V1::ObservationControllerTest < ActionDispatch::IntegrationTest
  setup do
    new_bird = Bird.create(scientific_name: 'Neo', english_name: 'New', swedish_name: 'Ny', family: families(:tits))
    @bird_id = new_bird.scientific_name
    @user = users(:ryan)
  end

  test 'POST #create throws a bad request error if the given bird is invalid' do
    sign_in @user

    post api_v1_bird_observations_url('Invalid name')

    assert_response :bad_request
    expected = { 'error'=> 'Bad request' }
    assert_equal(expected, json_response)
  end

  test 'POST #create successfully creates an observation for the logged in user' do
    sign_in @user

    assert_difference('@user.observations.count', 1) do
      post api_v1_bird_observations_url(@bird_id)
    end
    assert_response :success
    expected = { 'bird_scientific_name'=> 'Neo', 'bird_order_scientific_name'=> 'Passeriformes', 'bird_family_scientific_name'=> 'Paridae', 'seen'=> true }
    assert_equal(expected, json_response)
  end

  test 'POST #create returns an unauthorized response if not logged in' do
    post api_v1_bird_observations_url(@bird_id)

    assert_response :unauthorized
    expected = { 'error'=> 'You need to sign in or sign up before continuing.' }
    assert_equal(expected, json_response)
  end
end
