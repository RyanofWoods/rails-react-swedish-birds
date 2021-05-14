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

  def order_birds_seen_count(order)
    Observation.joins(:bird).where('birds.family.order': order, user: self).count
  end 

  def seen_bird?(bird)
    if Observation.find_by(user: self, bird: bird)
      true
    else
      false
    end
  end
end
