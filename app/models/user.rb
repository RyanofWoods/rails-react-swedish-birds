class User < ApplicationRecord
  acts_as_token_authenticatable

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :observations

  def family_birds_seen_count(family)
    Observation.joins(:bird).where('birds.family': family, user: self).count
  end 

  def seen_bird?(bird)
    if Observation.find_by(user: self, bird: bird)
      true
    else
      false
    end
  end
end
