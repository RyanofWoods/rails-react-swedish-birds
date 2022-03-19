require 'test_helper'

class FamilyTest < ActiveSupport::TestCase
  setup do
    @order = Order.create!(english_name: 'order', scientific_name: 'order', swedish_name: 'order')
    @family_one = @order.families.create!(english_name: 'family_one', scientific_name: 'family_one', swedish_name: 'family_one')
    @family_two = @order.families.create!(english_name: 'family_two', scientific_name: 'family_two', swedish_name: 'family_two')
    @bird_one = @family_one.birds.create!(english_name: 'bird_one', scientific_name: 'bird_one', swedish_name: 'bird_one', details: 'details', population_category: 1)
    @bird_two = @family_one.birds.create!(english_name: 'bird_two', scientific_name: 'bird_two', swedish_name: 'bird_two', details: 'details', population_category: 2)
    @bird_three = @family_one.birds.create!(english_name: 'bird_three', scientific_name: 'bird_three', swedish_name: 'bird_three', details: 'details', population_category: 3)
    @outsider_bird = @family_two.birds.create!(english_name: 'outsider', scientific_name: 'outsider', swedish_name: 'outsider', details: 'details', population_category: 3)
  end

  test '#birds_with_population_higher_or_equal_to returns all birds for the family when given no population category' do
    expected = @family_one.birds
    actual = @family_one.birds_with_population_higher_or_equal_to
    assert_equal(expected, actual)
  end

  test '#birds_with_population_higher_or_equal_to returns the birds of the population category and more common for the family' do
    expected = [@bird_one, @bird_two]
    actual = @family_one.birds_with_population_higher_or_equal_to(2)
    assert_equal(expected, actual)
  end
end
