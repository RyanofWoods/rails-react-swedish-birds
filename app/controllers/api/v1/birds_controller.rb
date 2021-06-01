class Api::V1::BirdsController < Api::V1::BaseController
  def search
    query_string = params[:query_string]

    if query_string
      threshold = params[:population_category_at_least]
      lang = params[:language_preference]

      birds = Bird.search_by_name(query_string, lang, threshold)
      render json: birds
    else
      throw_error
    end
  end

  private

  def throw_error
    render json: { error: "Bad request" }, status: :bad_request
  end
end
