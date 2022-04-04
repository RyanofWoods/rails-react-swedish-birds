class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def beta
    redirect_to new_user_session_path unless user_signed_in?
  end

  def home
    redirect_to new_user_session_path unless user_signed_in?
  end
end
