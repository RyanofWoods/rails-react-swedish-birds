Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  get '/settings', to: 'pages#home'

  get '/groups', to: 'pages#home'
  get '/groups/:id', to: 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/groups', to: 'families#index'
  
      resources :families, only: [:show]
      resources :orders, only: [:show]

      resources :birds, only: [] do
        resources :observations, only: [:create]
      end
    end
  end
end
