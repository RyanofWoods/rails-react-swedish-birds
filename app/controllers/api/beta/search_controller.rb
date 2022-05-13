class Api::Beta::SearchController < Api::Beta::BaseController
  def index
    @birds = Bird.search_by_all_names(params[:query])
  end
end
