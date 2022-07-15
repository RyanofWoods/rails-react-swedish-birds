class Api::OrdersController < Api::BaseController
  before_action :no_authentication_required, only: [:index]

  def index
    @orders = Order.all
  end
end
