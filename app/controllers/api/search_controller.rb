class Api::SearchController < Api::BaseController
  before_action :no_authentication_required, only: [:index]

  def index
    @birds = Bird.search_by_all_names(params[:query])
  end
end
