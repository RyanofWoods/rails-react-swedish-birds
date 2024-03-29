class Api::ObservationsController < Api::BaseController
  before_action :ensure_logged_in, only: [:create, :update]
  before_action :set_species, only: [:create, :update]
  before_action :set_observation, only: [:update]

  def index
    if signed_in?
      @observations = current_user.observations.joins(:species).select(:note, :observed_at, :scientific_name)
      render :index
    else
      render json: { observations: {} }, status: :ok
    end
  end

  def create
    return unknown_species unless @species

    @observation = current_user.observations.new(observation_params.merge(species: @species))

    if @observation.save
      render :show
    else
      throw_error(error: @observation.errors.full_messages.join)
    end
  end

  def update
    return unknown_species unless @species

    return no_observation unless @observation

    if @observation.update(observation_params.compact)
      render :show
    else
      throw_error(error: @observation.errors.full_messages.join)
    end
  end

  private

  def unknown_species
    throw_error(error: "Cannot find a species with the scientific name of #{species_scientific_name}.")
  end

  def throw_error(error: 'Bad request')
    render json: { error: error }, status: :bad_request
  end

  def no_observation
    render json: {
      error: %(No observation was found for a species with a scientific name of "#{species_scientific_name}")
    },
           status: :not_found
  end

  def set_species
    @species = Species.find_by(scientific_name: species_scientific_name.capitalize)
  end

  def set_observation
    @observation = current_user.observations.find_by(species: @species)
  end

  def species_scientific_name
    params[:species_id] || params[:id]
  end

  def observation_params
    params.permit(:note, :observed_at).tap do |params|
      params[:observed_at] = 0 if params[:observed_at] == '0'
    end
  end
end
