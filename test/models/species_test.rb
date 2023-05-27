require 'test_helper'

class SpeciesTest < ActiveSupport::TestCase
  setup do
    @new_species = Species.new(scientific_name: 'Neo', english_name: 'New', swedish_name: 'Ny', population_category: 1,
                               family: families(:tits))
  end

  test 'Species cannot be created without a population_category' do
    @new_species.population_category = nil

    assert_difference('Species.count', 0) do
      @new_species.save
    end

    actual = @new_species.errors.full_messages
    expected = "Population category can't be blank"
    assert_includes(actual, expected)
  end

  test '.all does not include species with a population category of nil (never seen in Sweden)' do
    non_occuring_species = species(:white_winged_scoter)
    actual = Species.all
    refute_includes(actual, non_occuring_species)
  end

  test '.search_by_all_names searches by English name' do
    actual = Species.search_by_all_names('spar')

    assert_includes(actual, species(:pygmy_owl))
    assert_includes(actual, species(:house_sparrow))
    assert_includes(actual, species(:tree_sparrow))
    assert_includes(actual, species(:white_throated_sparrow))
  end

  test '.search_by_all_names searches by Scientific name' do
    actual = Species.search_by_all_names('major')

    assert_includes(actual, species(:great_tit))
    assert_includes(actual, species(:great_spotted_woodpecker))
  end

  test '.search_by_all_names searches by Swedish name' do
    actual = Species.search_by_all_names('uggla')

    assert_includes(actual, species(:pygmy_owl))
  end
end
