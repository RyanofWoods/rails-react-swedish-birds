require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  setup do
    @order = Order.create!(english_name: 'order', scientific_name: 'order', swedish_name: 'order')
    @family = @order.families.create!(english_name: 'family', scientific_name: 'family', swedish_name: 'family')
    @bird_one = @family.birds.create!(english_name: 'bird_one', scientific_name: 'bird_one', swedish_name: 'bird_one', details: 'details', population_category: 1)
    @bird_two = @family.birds.create!(english_name: 'bird_two', scientific_name: 'bird_two', swedish_name: 'bird_two', details: 'details', population_category: 2)
    @bird_three = @family.birds.create!(english_name: 'bird_three', scientific_name: 'bird_three', swedish_name: 'bird_three', details: 'details', population_category: 3)
  end

  test '#birds_with_population_higher_or_equal_to returns all birds for the order when given no population category' do
    expected = @order.birds
    actual = @order.birds_with_population_higher_or_equal_to
    assert_equal(expected, actual)
  end

  test '#birds_with_population_higher_or_equal_to returns the birds for the population category and more common for the order' do
    expected = [@bird_one, @bird_two]
    actual = @order.birds_with_population_higher_or_equal_to(2)
    assert_equal(expected, actual)
  end
end
