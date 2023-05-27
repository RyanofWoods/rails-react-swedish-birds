class Api::SearchController < Api::BaseController
  def index
    @birds = Species.search_by_all_names(params[:query])
  end
end
