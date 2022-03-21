require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test '#family_birds_seen_count is correct with no given population threshold' do
    user = users(:ryan)
    tit_family = families(:tits)

    expected = user_family_observations(user, family: tit_family).count
    actual = user.family_birds_seen_count(tit_family)

    assert_equal(expected, actual)
  end

  test '#family_birds_seen_count is correct with a given population threshold' do
    user = users(:ryan)
    tit_family = families(:tits)

    population_one_count = user_family_observations(user, family: tit_family, population_category: 1).count
    population_two_count = user_family_observations(user, family: tit_family, population_category: 2).count
    expected = population_one_count + population_two_count
    actual = user.family_birds_seen_count(tit_family, 2)

    assert_equal(expected, actual)
  end

  test '#order_birds_seen_count is correct with no given population threshold' do
    user = users(:ryan)
    perching_birds_order = orders(:perching_birds)

    expected = user_order_observations(user, order: perching_birds_order).count
    actual = user.order_birds_seen_count(perching_birds_order)

    assert_equal(expected, actual)
  end

  test '#order_birds_seen_count is correct with a given population threshold' do
    user = users(:ryan)
    perching_birds_order = orders(:perching_birds)

    population_one_count = user_order_observations(user, order: perching_birds_order, population_category: 1).count
    population_two_count = user_order_observations(user, order: perching_birds_order, population_category: 2).count
    expected = population_one_count + population_two_count
    actual = user.order_birds_seen_count(perching_birds_order, 2)

    assert_equal(expected, actual)
  end

  test '#seen_bird? returns true when the user has an observation for the given bird' do
    bird = birds(:blue_tit)
    user = users(:ryan)

    assert(user.seen_bird?(bird))
  end

  test '#seen_bird? returns false when the user does not have an observation for the given bird' do
    bird = birds(:azure_tit)
    user = users(:ryan)

    refute(user.seen_bird?(bird))
  end

  test '#groups_data returns correctly for a collection of Families' do
    user = users(:ryan)
    families = Family.where(id: [1, 47])
    population_threshold = 6

    expected = {
      grouped_by: 'family',
      population_threshold:  population_threshold,
      total_groups: 2,
      total_seen: 4,
      total_birds: 4,
      groups: [
        { scientific_name: 'Anatidae', english_name: 'Ducks, Geese and Swans', swedish_name: 'Änder', total_seen: 1, total_birds: 1 },
        { scientific_name: 'Paridae', english_name: 'Tits', swedish_name: 'Mesar', total_seen: 3, total_birds: 3 }
      ]
    }
    actual = user.groups_data(families, population_threshold)

    assert_equal(expected, actual)
  end

  test '#groups_data returns correctly for a collection of Orders' do
    user = users(:ryan)
    orders = Order.where(id: [1, 24])
    population_threshold = 6

    expected = {
      grouped_by: 'order',
      population_threshold:  population_threshold,
      total_groups: 2,
      total_seen: 4,
      total_birds: 7,
      groups: [
        { scientific_name: 'Anseriformes', english_name: 'Waterfowl', swedish_name: 'Andfåglar', total_seen: 1, total_birds: 1 },
        { scientific_name: 'Passeriformes', english_name: 'Perching birds', swedish_name: 'Tättingar', total_seen: 3, total_birds: 6 }
      ]
    }
    actual = user.groups_data(orders, population_threshold)

    assert_equal(expected, actual)
  end

  private

  def user_family_observations(user, scope)
    user.observations.joins(bird: :family).where(bird: scope.compact)
  end

  def user_order_observations(user, scope)
    scope[:families] = { order: scope.delete(:order)}
    user.observations.joins(bird: { family: :order }).where(bird: scope.compact)
  end
end
