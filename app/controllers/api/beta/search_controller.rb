class Api::Beta::SearchController < Api::V1::BaseController
  def index
    @birds = Bird.search_by_all_names(params[:query])
  end
end
