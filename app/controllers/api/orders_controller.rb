class Api::OrdersController < Api::BaseController
  def index
    @orders = Order.all
  end
end
