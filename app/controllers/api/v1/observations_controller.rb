class Api::V1::ObservationsController < Api::V1::BaseController
  before_action :set_bird, only: [:create]
  after_action :verify_authorized, only: [:index]

  def index
    throw_error unless user_signed_in?

    authorize Observation

    @observations = current_user.observations
  end

  def create
    return throw_error unless @bird

    observation = Observation.new(bird: @bird, user: current_user, note: observation_params[:note])

    if observation.save
      render json: {
                    bird_scientific_name: @bird.scientific_name,
                    bird_order_scientific_name: @bird.family.order.scientific_name,
                    bird_family_scientific_name: @bird.family.scientific_name,
                    note: observation.note,
                    seen: true
                  }
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

  def observation_params
    params.permit(:note)
  end
end
