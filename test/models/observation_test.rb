require 'test_helper'

class ObservationTest < ActiveSupport::TestCase
  setup do
    @user = users(:ryan)
    @other_user = users(:sara)
    @species = species(:azure_tit)
    @valid_attributes = { species: @species, note: 'note', observed_at: '26/03/2022' }
  end

  test 'a user cannot have two observations for one species' do
    observation = @user.observations.new(@valid_attributes)
    assert_equal(true, observation.save)

    observation = @user.observations.new(@valid_attributes)
    assert_equal(false, observation.save)
    assert_includes(observation.errors.full_messages, 'Species can only have one observation per user.')
  end

  test 'users can each have an observation for the same species.' do
    observation = @user.observations.new(@valid_attributes)
    assert_equal(true, observation.save)

    other_observation = @other_user.observations.new(@valid_attributes)
    assert_equal(true, other_observation.save)
  end

  test 'cannot be saved without observed_at' do
    observation = @user.observations.new(species: @species, note: 'note')

    assert_equal(false, observation.save)
    assert_includes(observation.errors.full_messages, 'Observed at must be a Date or zero.')
  end

  test 'a string date gets correctly corrected for observed_at' do
    observed_at = '26/03/2022'
    observation = @user.observations.new(species: @species, note: 'note', observed_at: observed_at)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_equal(Date, observation.observed_at.class)
  end

  test 'observed_at gets saved as nil when 0' do
    observed_at = 0
    observation = @user.observations.new(species: @species, note: 'note', observed_at: observed_at)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_nil(observation.observed_at)
  end

  test 'an actual note get correctly saved' do
    note = 'First observation note'
    observation = @user.observations.new(species: @species, note: note, observed_at: Date.today)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_equal(note, observation.note)
  end

  test 'observation can be saved without a note' do
    observation = @user.observations.new(species: @species, observed_at: Date.today)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
  end

  test "note gets saved as nil when it's nil" do
    note = nil
    observation = @user.observations.new(species: @species, note: note, observed_at: Date.today)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_nil(observation.note)
  end

  test "note gets saved as nil when it's an empty string" do
    note = ''
    observation = @user.observations.new(species: @species, note: note, observed_at: Date.today)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_nil(observation.note)
  end
end
