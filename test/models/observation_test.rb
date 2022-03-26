require 'test_helper'

class ObservationTest < ActiveSupport::TestCase
  setup do
    @user = users(:ryan)
    @bird = birds(:azure_tit)
  end

  test 'cannot be saved without observed_at' do
    observation = @user.observations.new(bird: @bird, note: 'note')

    assert_equal(false, observation.save)
    assert_includes(observation.errors.full_messages, 'Observed at must be a Date or zero.')
  end

  test 'a string date gets correctly corrected for observed_at' do
    observed_at = '26/03/2022'
    observation = @user.observations.new(bird: @bird, note: 'note', observed_at: observed_at)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_equal(Date, observation.observed_at.class)
  end

  test 'observed_at gets saved as nil when 0' do
    observed_at = 0
    observation = @user.observations.new(bird: @bird, note: 'note', observed_at: observed_at)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_nil(observation.observed_at)
  end

  test 'an actual note get correctly saved' do
    note = 'First observation note'
    observation = @user.observations.new(bird: @bird, note: note, observed_at: Date.today)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_equal(note, observation.note)
  end

  test 'observation can be saved without a note' do
    observation = @user.observations.new(bird: @bird, observed_at: Date.today)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
  end

  test "note gets saved as nil when it's nil" do
    note = nil
    observation = @user.observations.new(bird: @bird, note: note, observed_at: Date.today)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_nil(observation.note)
  end

  test "note gets saved as nil when it's an empty string" do
    note = ''
    observation = @user.observations.new(bird: @bird, note: note, observed_at: Date.today)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_nil(observation.note)
  end
end
