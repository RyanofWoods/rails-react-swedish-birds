require 'test_helper'

class Api::ObservationControllerTest < ActionDispatch::IntegrationTest
  setup do
    @new_bird = Bird.create(scientific_name: 'Neo', english_name: 'New', swedish_name: 'Ny', population_category: 1,
                            family: families(:tits))
    @user = users(:ryan)
    @observed_at = Date.today
  end

  test 'POST #create returns an unauthorized response if there is no logged in user' do
    post api_bird_observations_url(@new_bird.scientific_name)

    assert_response :unauthorized
    expected = { 'error' => 'You need to sign in or sign up before continuing.' }
    assert_equal(expected, json_response)
  end

  test 'POST #create throws an error when the given bird scientific name is invalid' do
    sign_in @user

    post api_bird_observations_url('Invalid name')

    assert_response :bad_request
    expected = { 'error' => 'Cannot find a bird with the scientific name of Invalid name.' }
    assert_equal(expected, json_response)
  end

  test 'POST #create throws an error when observed_at is not a date or 0' do
    sign_in @user

    post api_bird_observations_url(@new_bird.scientific_name, params: { observed_at: nil })

    assert_response :bad_request
    expected = { 'error' => 'Observed at must be a Date or zero.' }
    assert_equal(expected, json_response)
  end

  test 'POST #create creates an observation for the logged in user' do
    sign_in @user
    note = 'First observation notes'

    assert_difference('@user.observations.count', 1) do
      post api_bird_observations_url(@new_bird.scientific_name, params: { note: note, observed_at: @observed_at.to_s })
    end
    observation = @user.observations.last
    assert_response :success
    expected = {
      "details" => nil,
      "populationCategory" => 1,
      "scientificName" => "Neo",
      "englishName" => "New",
      "swedishName" => "Ny",
      "familyScientificName" => "Paridae",
      "orderScientificName" => "Passeriformes",
      "seen" => true,
      "observation" => {
        'note' => note,
        'observedAt' => @observed_at.to_s
      }
    }
    assert_equal(@observed_at, observation.observed_at)
    assert_equal(expected, json_response)
  end

  test 'POST #create creates an observation even without a given note' do
    sign_in @user

    assert_difference('@user.observations.count', 1) do
      post api_bird_observations_url(@new_bird.scientific_name, params: { observed_at: '0' })
    end
    assert_response :success
    expected = {
      "details" => nil,
      "populationCategory" => 1,
      "scientificName" => "Neo",
      "englishName" => "New",
      "swedishName" => "Ny",
      "familyScientificName" => "Paridae",
      "orderScientificName" => "Passeriformes",
      "seen" => true,
      "observation" => {
        'note' => nil,
        'observedAt' => nil
      }
    }
    assert_equal(expected, json_response)
  end

  test 'PATCH #update returns an unauthorized response if there is no logged in user' do
    patch api_observation_url(@new_bird.scientific_name)

    assert_response :unauthorized
    expected = { 'error' => 'You need to sign in or sign up before continuing.' }
    assert_equal(expected, json_response)
  end

  test 'PATCH #update returns an error when the given bird scientific name is invalid' do
    sign_in @user

    patch api_observation_url('Invalid name', observed_at: 0, note: 'A new note.')

    assert_response :bad_request
    expected = { 'error' => 'Cannot find a bird with the scientific name of Invalid name.' }
    assert_equal(expected, json_response)
  end

  test 'PATCH #update returns an error when the user does not have an observation for the given bird' do
    another_user = users(:sara)
    another_user.observations.create!(bird: @new_bird, observed_at: @observed_at.to_s, note: 'Note')

    sign_in @user

    patch api_observation_url(@new_bird.scientific_name, observed_at: 0, note: 'A new note.')

    assert_response :not_found
    expected = {
      'error' => %(No observation was found for a bird with a scientific name of "#{@new_bird.scientific_name}")
    }
    assert_equal(expected, json_response)
  end

  test 'PATCH #update successfully edits the observation' do
    @user.observations.create!(bird: @new_bird, observed_at: @observed_at.to_s, note: 'Note')
    sign_in @user

    patch api_observation_url(@new_bird.scientific_name, observed_at: 0, note: 'A new note.')
    assert_response :success
    observation = @user.observations.last
    assert_nil(nil, observation.observed_at)
    assert_equal('A new note.', observation.note)
    expected = {
      "details" => nil,
      "populationCategory" => 1,
      "scientificName" => "Neo",
      "englishName" => "New",
      "swedishName" => "Ny",
      "familyScientificName" => "Paridae",
      "orderScientificName" => "Passeriformes",
      "seen" => true,
      "observation" => {
        'note' => 'A new note.',
        'observedAt' => nil
      }
    }
    assert_equal(expected, json_response)
  end

  test "PATCH #update successfully edits the observation and it doesn't override attributes when given nil" do
    @user.observations.create(bird: @new_bird, observed_at: @observed_at, note: 'Note')
    sign_in @user
    new_date = Date.yesterday

    patch api_observation_url(@new_bird.scientific_name, observed_at: new_date.to_s, note: nil)
    assert_response :success
    observation = @user.observations.last
    assert_equal(new_date, observation.observed_at)
    assert_equal('Note', observation.note)
    expected = {
      "details" => nil,
      "populationCategory" => 1,
      "scientificName" => "Neo",
      "englishName" => "New",
      "swedishName" => "Ny",
      "familyScientificName" => "Paridae",
      "orderScientificName" => "Passeriformes",
      "seen" => true,
      "observation" => {
        'note' => 'Note',
        'observedAt' => new_date.to_s
      }
    }
    assert_equal(expected, json_response)
  end
end
