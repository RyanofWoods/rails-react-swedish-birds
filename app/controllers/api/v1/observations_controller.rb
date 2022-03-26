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

    observation = Observation.new(bird: @bird, user: current_user, note: observation_params[:note], observed_at: observation_params[:observed_at])

    if observation.save
      render json: {
                    bird_scientific_name: @bird.scientific_name,
                    bird_order_scientific_name: @bird.family.order.scientific_name,
                    bird_family_scientific_name: @bird.family.scientific_name,
                    note: observation.note,
                    observed_at: observation.observed_at,
                    seen: true
                  }
    else
      throw_error(error: observation.errors.full_messages.join)
    end
  end

  private

  def throw_error(error: 'Bad request')
    render json: { error: error }, status: :bad_request
  end

  def set_bird
    @bird = Bird.find_by(scientific_name: params[:bird_id].capitalize)
  end

  def observation_params
    params.permit(:note, :observed_at)
  end
end
