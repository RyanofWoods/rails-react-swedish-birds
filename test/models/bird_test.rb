require 'test_helper'

class BirdTest < ActiveSupport::TestCase
  setup do
    @order = Order.create!(english_name: 'order', scientific_name: 'order', swedish_name: 'order')
    @family_one = @order.families.create!(english_name: 'family_one', scientific_name: 'family_one', swedish_name: 'family_one')
    @family_two = @order.families.create!(english_name: 'family_two', scientific_name: 'family_two', swedish_name: 'family_two')
    @bird_one = @family_one.birds.create!(english_name: 'bird_one', scientific_name: 'bird_one', swedish_name: 'bird_one', details: 'details', population_category: 1)
    @bird_two = @family_one.birds.create!(english_name: 'bird_two', scientific_name: 'bird_two', swedish_name: 'bird_two', details: 'details', population_category: 2)
    @bird_three = @family_one.birds.create!(english_name: 'bird_three', scientific_name: 'bird_three', swedish_name: 'bird_three', details: 'details', population_category: 3)
    @outsider_bird = @family_two.birds.create!(english_name: 'outsider', scientific_name: 'outsider', swedish_name: 'outsider', details: 'details', population_category: 3)
    @new_bird = Bird.new(scientific_name: 'Neo', english_name: 'New', swedish_name: 'Ny', population_category: 1, family: families(:tits))
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

  test '.search_by_name searches by English name when given the language preference of "EN"' do
    actual = Bird.search_by_name('tit', 'EN', 7)

    expected = { scientific_name: 'Cyanistes caeruleus', english_name: 'Eurasian Blue Tit', family: { scientific_name: 'Paridae' }, order: { scientific_name: 'Passeriformes' } }
    assert_includes(actual, expected)
    expected = { scientific_name: 'Parus major', english_name: 'Great Tit', family: { scientific_name: 'Paridae' }, order: { scientific_name: 'Passeriformes' } }
    assert_includes(actual, expected)
    expected = { scientific_name: 'Cyanistes cyanus', english_name: 'Azure Tit', family: { scientific_name: 'Paridae' }, order: { scientific_name: 'Passeriformes' } }
    refute_includes(actual, expected)
  end

  test '.search_by_name searches by Scientific name when given the language preference of "EN"' do
    actual = Bird.search_by_name('major', 'EN', nil)

    expected = { scientific_name: 'Dendrocopos major', english_name: 'Great Spotted Woodpecker', family: { scientific_name: 'Picidae' }, order: { scientific_name: 'Piciformes' } }
    assert_includes(actual, expected)
    expected = { scientific_name: 'Parus major', english_name: 'Great Tit', family: { scientific_name: 'Paridae' }, order: { scientific_name: 'Passeriformes' } }
    assert_includes(actual, expected)
  end

  test '.search_by_name searches by Swedish name when given the language preference of "SE"' do
    actual = Bird.search_by_name('spett', 'SE', 4)

    expected = { scientific_name: 'Dendrocopos major', swedish_name: 'Större Hackspett', family: { scientific_name: 'Picidae' }, order: { scientific_name: 'Piciformes' } }
    assert_includes(actual, expected)
    expected = { scientific_name: 'Dendrocopos leucotos', swedish_name: 'Vitryggig Hackspett', family: { scientific_name: 'Picidae' }, order: { scientific_name: 'Piciformes' } }
    refute_includes(actual, expected)
  end

  test '.search_by_name searches by Scientific name when given the language preference of "SE"' do
    actual = Bird.search_by_name('major', 'SE', nil)

    expected = { scientific_name: 'Dendrocopos major', swedish_name: 'Större Hackspett', family: { scientific_name: 'Picidae' }, order: { scientific_name: 'Piciformes' } }
    assert_includes(actual, expected)
    expected = { scientific_name: 'Parus major', swedish_name: 'Talgoxe', family: { scientific_name: 'Paridae' }, order: { scientific_name: 'Passeriformes' } }
    assert_includes(actual, expected)
  end

  test '.search_by_name searches by English name when given the language preference of the default "BOTH"' do
    actual = Bird.search_by_name('spar', nil, 7)

    expected = { scientific_name: 'Glaucidium passerinum', english_name: 'Eurasian Pygmy Owl', swedish_name: 'Sparvuggla', family: { scientific_name: 'Strigidae' }, order: { scientific_name: 'Strigiformes' } }
    assert_includes(actual, expected)
    expected = { scientific_name: 'Passer domesticus', english_name: 'House Sparrow', swedish_name: 'Gråsparv', family: { scientific_name: 'Passeridae' }, order: { scientific_name: 'Passeriformes' } }
    assert_includes(actual, expected)
    expected = { scientific_name: 'Passer montanus', english_name: 'Eurasian Tree Sparrow', swedish_name: 'Pilfink', family: { scientific_name: 'Passeridae' }, order: { scientific_name: 'Passeriformes' } }
    assert_includes(actual, expected)
    expected = { scientific_name: 'Glaucidium passerinum', english_name: 'Eurasian Pygmy Owl', swedish_name: 'Sparvuggla', family: { scientific_name: 'Strigidae' }, order: { scientific_name: 'Strigiformes' } }
    assert_includes(actual, expected)
    expected = { scientific_name: 'Zonotrichia albicollis', english_name: 'White-throated Sparrow', swedish_name: 'Vitstrupig Sparv', family: { scientific_name: 'Passerellidae' }, order: { scientific_name: 'Passeriformes' } }
    refute_includes(actual, expected)
  end

  test '.search_by_name searches by Scientific name when given the language preference of the default "BOTH"' do
    actual = Bird.search_by_name('major', nil, nil)

    expected = { scientific_name: 'Dendrocopos major', english_name: 'Great Spotted Woodpecker', swedish_name: 'Större Hackspett', family: { scientific_name: 'Picidae' }, order: { scientific_name: 'Piciformes' } }
    assert_includes(actual, expected)
    expected = { scientific_name: 'Parus major', english_name: 'Great Tit', swedish_name: 'Talgoxe', family: { scientific_name: 'Paridae' }, order: { scientific_name: 'Passeriformes' } }
    assert_includes(actual, expected)
  end

  test '.search_by_name searches by Swedish name when given the language preference of the default "BOTH"' do
    actual = Bird.search_by_name('uggla', nil, 7)

    expected = { scientific_name: 'Glaucidium passerinum', english_name: 'Eurasian Pygmy Owl', swedish_name: 'Sparvuggla', family: { scientific_name: 'Strigidae' }, order: { scientific_name: 'Strigiformes' } }
    assert_includes(actual, expected)
  end
end
