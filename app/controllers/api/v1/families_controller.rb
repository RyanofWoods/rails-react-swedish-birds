class Api::V1::FamiliesController < Api::V1::BaseController
  before_action :set_family, only: [:show]
  after_action :verify_authorized, only: [:index, :show]

  def index
    @families = policy_scope(Family)
    @total_families = Family.count
    @total_birds = authorize Bird.count, policy_class: FamilyPolicy
    # can check observations, as user & bird pairs must be unique
    @total_seen = authorize Observation.count, policy_class: FamilyPolicy
  end

  def show
    return unless @family && user_signed_in?

    authorize @family

    @family_birds = @family&.birds
    @total_birds = @family&.birds.count
    @total_seen = authorize current_user.family_birds_seen_count(@family), policy_class: FamilyPolicy
  end

  private

  def set_family
    @family = Family.find_by(scientific_name: params[:id].capitalize)
  end
end
