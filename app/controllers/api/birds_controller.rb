class Api::BirdsController < Api::BaseController
  before_action :no_authentication_required, only: [:index]

  def index
    user_id = current_user&.id.to_i
    @birds = Bird.eager_load(family: :order).merge(Bird.with_user_observations(user_id))
  end
end
