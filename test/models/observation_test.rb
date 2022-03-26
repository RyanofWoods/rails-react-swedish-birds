require 'test_helper'

class ObservationTest < ActiveSupport::TestCase
  setup do
    @user = users(:ryan)
    @bird = birds(:azure_tit)
  end

  test 'an actual note get correctly saved' do
    note = 'First observation note'
    observation = @user.observations.new(bird: @bird, note: note)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_equal(note, observation.note)
  end

  test 'observation can be saved without a note' do
    observation = @user.observations.new(bird: @bird)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
  end

  test "note gets saved as nil when it's nil" do
    note = nil
    observation = @user.observations.new(bird: @bird, note: note)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_nil(observation.note)
  end

  test "note gets saved as nil when it's an empty string" do
    note = ''
    observation = @user.observations.new(bird: @bird, note: note)

    assert_difference('@user.observations.count', 1) do
      observation.save
    end
    assert_nil(observation.note)
  end
end
