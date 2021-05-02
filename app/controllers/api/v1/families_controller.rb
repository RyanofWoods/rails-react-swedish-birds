class Api::V1::FamiliesController < Api::V1::BaseController
  before_action :set_family, only: [:show]
  after_action :verify_authorized, only: [:index, :show]

  def index
    @families = policy_scope(Family)
    @total_families = Family.count
    @total_birds = Bird.count
    @total_seen = authorize Bird.where(seen: true).count, policy_class: FamilyPolicy
  end

  def show
    return unless @family

    authorize @family

    @family_birds = @family&.birds
    @total_birds = @family&.birds.count
    @total_seen = @family&.birds.where(seen: true).count
  end

  private

  def set_family
    @family = Family.find_by(scientific_name: params[:id].capitalize)
  end
end
