class Api::BaseController < ActionController::API
  def ensure_logged_in
    render json: { error: 'You need to sign in or sign up before continuing.' }, status: :unauthorized unless signed_in?
  end
end
