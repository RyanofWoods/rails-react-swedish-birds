class Api::BaseController < ActionController::API
  acts_as_token_authentication_handler_for User, unless: :no_authentication_required

  private

  def no_authentication_required
    _process_action_callbacks.map(&:filter).compact.include? :no_authentication_required
  end
end
