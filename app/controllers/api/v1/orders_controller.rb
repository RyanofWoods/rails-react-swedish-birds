class Api::V1::OrdersController < Api::V1::BaseController
  before_action :set_order, only: [:show]
  after_action :verify_authorized, only: [:index, :show]

  def show
    return unless @order && user_signed_in?

    authorize @order

    @order_scientific_name = @order&.scientific_name
    @order_english_name = @order&.english_name
    @order_swedish_name = @order&.swedish_name

    @order_birds = @order&.birds_with_population_higher_or_equal_to(params[:population_category_at_least])
    @total_birds = @order_birds.count

    @total_seen = authorize current_user.order_birds_seen_count(@order, params[:population_category_at_least]), policy_class: FamilyPolicy
  end

  private

  def set_order
    @order = Order.find_by(scientific_name: params[:id].capitalize)
  end
end
