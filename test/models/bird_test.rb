require 'test_helper'

class BirdTest < ActiveSupport::TestCase
  setup do
    @new_bird = Bird.new(scientific_name: 'Neo', english_name: 'New', swedish_name: 'Ny', population_category: 1,
                         family: families(:tits))
  end

  test 'Birds cannot be created without a population_category' do
    @new_bird.population_category = nil

    assert_difference('Bird.count', 0) do
      @new_bird.save
    end

    actual = @new_bird.errors.full_messages
    expected = "Population category can't be blank"
    assert_includes(actual, expected)
  end

  test '.all does not include birds with a population category of nil (never seen in Sweden)' do
    non_occuring_bird = birds(:white_winged_scoter)
    actual = Bird.all
    refute_includes(actual, non_occuring_bird)
  end

  test '.search_by_all_names searches by English name' do
    actual = Bird.search_by_all_names('spar')

    assert_includes(actual, birds(:pygmy_owl))
    assert_includes(actual, birds(:house_sparrow))
    assert_includes(actual, birds(:tree_sparrow))
    assert_includes(actual, birds(:white_throated_sparrow))
  end

  test '.search_by_all_names searches by Scientific name' do
    actual = Bird.search_by_all_names('major')

    assert_includes(actual, birds(:great_tit))
    assert_includes(actual, birds(:great_spotted_woodpecker))
  end

  test '.search_by_all_names searches by Swedish name' do
    actual = Bird.search_by_all_names('uggla')

    assert_includes(actual, birds(:pygmy_owl))
  end
end
