Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :families, only: [:index, :show]
      resources :birds, only: [] do
        resources :observations, only: [:create]
      end
    end
  end
end
