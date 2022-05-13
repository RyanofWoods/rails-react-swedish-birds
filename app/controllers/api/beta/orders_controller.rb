class Api::Beta::OrdersController < Api::Beta::BaseController
  def index
    @orders = Order.all
  end
end
