class Api::V1::GroupsController < Api::V1::BaseController
  before_action :set_group, only: [:show]
  after_action :verify_authorized, only: [:index]

  def show
    return unless @group && user_signed_in?

    @group_scientific_name = @group&.scientific_name
    @group_english_name = @group&.english_name
    @group_swedish_name = @group&.swedish_name

    @birds = @group&.birds_with_population_higher_or_equal_to(params[:population_category_at_least])
    @total_birds = @birds.size
    @observations = current_user.observations.where(bird: @birds)
    @total_seen = @observations.size
  end

  def index
    if params[:group_by] == 'order'
      groups = Order.order(:created_at)
    else
      groups = Family.order(:created_at)
    end

    pop_cat = params[:population_category_at_least].to_i if params[:population_category_at_least]

    raw_data = authorize current_user.groups_data(groups, pop_cat),
                         policy_class: GroupPolicy

    render json: raw_data
  end

  private

  def set_group
    @group = group.find_by(scientific_name: params[:id].capitalize)
  end

  def group
    controller_name.classify.constantize
  end
end
