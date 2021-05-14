class User < ApplicationRecord
  acts_as_token_authenticatable

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :observations

  def family_birds_seen_count(family, population_category = nil)
    # this captures all the birds apart from the ones with unknown population (pop_cat 100)
    population_category = 9 unless population_category

    Observation.joins(:bird).where('birds.family_id = :family and user_id = :user and birds.population_category <= :pop_cat',
                                  { family: family.id, user: self.id, pop_cat: population_category.to_i }).count
  end 
  
  def order_birds_seen_count(order, population_category = nil)
    # this captures all the birds apart from the ones with unknown population (pop_cat 100)
    population_category = 9 unless population_category

    Observation.joins(bird: :family).where('families.order_id = :order and user_id = :user and birds.population_category <= :pop_cat',
                                  { order: order.id, user: self.id, pop_cat: population_category.to_i }).count
  end 

  def groups_data(groups, population_category = nil)
    groups_class = groups.name.downcase
    total_seen = 0
    total_birds = 0

    # replace groups with json hashes
    groups = groups.map do |group|
      birds = group.birds_with_population_higher_or_equal_to(population_category)
      group_bird_count = birds.count
  
      # the families/orders that have no birds with the given population range
      if birds.size.zero?
        nil
      else
        if groups_class == 'order'
          group_seen_count = self.order_birds_seen_count(group, population_category)
        else 
          group_seen_count = self.family_birds_seen_count(group, population_category)
        end

        total_seen += group_seen_count
        total_birds += group_bird_count
        
        {
          scientific_name: group.scientific_name,
          english_name: group.english_name,
          swedish_name: group.swedish_name,
          total_seen: group_seen_count,
          total_birds: group_bird_count
        }
      end
    end

    # get rid of the groups that have no birds
    groups = groups.compact

    group_data = {
      grouped_by: groups_class,
      total_groups: groups.count,
      total_seen: total_seen,
      total_birds: total_birds,
      groups: groups
    }

    group_data
  end

  def seen_bird?(bird)
    if Observation.find_by(user: self, bird: bird)
      true
    else
      false
    end
  end
end
