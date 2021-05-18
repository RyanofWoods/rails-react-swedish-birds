class Api::V1::FamiliesController < Api::V1::BaseController
  before_action :set_family, only: [:show]
  after_action :verify_authorized, only: [:index, :show]

  def index
    if params[:group_by] == 'order'
      groups = Order.all
    else
      groups = Family.all
    end

    pop_cat = params[:population_category_at_least]

    raw_data = authorize current_user.groups_data(groups, pop_cat),
                         policy_class: FamilyPolicy

    render json: raw_data
  end

  def show
    return unless @family && user_signed_in?

    authorize @family

    @family_scientific_name = @family&.scientific_name
    @family_english_name = @family&.english_name
    @family_swedish_name = @family&.swedish_name

    @family_birds = @family&.birds_with_population_higher_or_equal_to(params[:population_category_at_least])
    @total_birds = @family_birds.count

    @total_seen = authorize current_user.family_birds_seen_count(@family, params[:population_category_at_least]),
                            policy_class: FamilyPolicy
  end

  private

  def set_family
    @family = Family.find_by(scientific_name: params[:id].capitalize)
  end
end
