class Api::V1::ObservationsController < Api::V1::BaseController
  before_action :set_bird
  after_action :verify_authorized, only: [:create]

  def create
    throw_error unless user_signed_in? && @bird

    authorize @bird, policy_class: ObservationPolicy

    if Observation.create(bird: @bird, user: current_user)
      render json: { scientific_name: @bird.scientific_name, seen: true }
    else
      throw_error
    end
  end

  private

  def throw_error
    render json: { error: "Bad request" }, status: :bad_request
  end

  def set_bird
    @bird = Bird.find_by(scientific_name: params[:bird_id].capitalize)
  end
end
