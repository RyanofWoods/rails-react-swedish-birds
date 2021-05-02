class Api::V1::BaseController < ActionController::API
  include Pundit

  acts_as_token_authentication_handler_for User
end
