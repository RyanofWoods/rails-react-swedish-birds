class BirdPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def update?
    user_logged_in?
  end
end
