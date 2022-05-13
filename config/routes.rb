Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :beta do
      get '/search', to: 'search#index'

      resources :orders, :families, only: :index

      resources :birds, only: :index do
        resources :observations, only: [:create]
      end
    end
  end

  root to: 'pages#beta'
  get '/*path', to: 'pages#beta'
end
