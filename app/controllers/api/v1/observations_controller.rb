class Api::V1::ObservationsController < Api::V1::BaseController
  before_action :set_bird
  after_action :verify_authorized, only: [:create]

  def create
    return nil unless user_signed_in? && @bird

    authorize @bird, policy_class: ObservationPolicy

    Observation.create(bird: @bird, user: current_user)
  end

  private

  def set_bird
    @bird = Bird.find(params[:bird_id])
  end
end
