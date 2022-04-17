Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/groups', to: 'groups#index'
      get 'birds/search', to: 'birds#search'
      
      resources :families, only: [:show]
      resources :orders, only: [:show]

      resources :observations, only: [:index]

      resources :birds, only: [] do
        resources :observations, only: [:create]
      end
    end

    namespace :beta do
      get '/search', to: 'search#index'

      resources :orders, only: :index

      resources :birds, only: :index do
        resources :observations, only: [:create]
      end
    end
  end

  get '/beta', to: 'pages#beta'
  root to: 'pages#home'
  get '/*path', to: 'pages#home'
end
