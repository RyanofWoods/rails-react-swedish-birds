class ObservationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    user_logged_in?
  end

  def create?
    user_logged_in?
  end
end
