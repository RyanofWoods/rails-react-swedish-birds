class Api::Beta::OrdersController < Api::V1::BaseController
  def index
    @orders = Order.all
  end
end
