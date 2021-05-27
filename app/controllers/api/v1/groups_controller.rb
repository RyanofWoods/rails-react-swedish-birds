class Api::V1::GroupsController < Api::V1::BaseController
  after_action :verify_authorized, only: [:index]

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
end
