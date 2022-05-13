class Api::ObservationsController < Api::BaseController
  before_action :set_bird, only: [:create]

  def create
    return unknown_bird unless @bird

    @observation = current_user.observations.new(observation_params.merge(bird: @bird))

    return if @observation.save

    throw_error(error: @observation.errors.full_messages.join)
  end

  private

  def unknown_bird
    throw_error(error: "Cannot find a bird with the scientific name of #{params[:bird_id]}.")
  end

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
