Rails.application.routes.draw do
  devise_for :users
  
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/groups', to: 'groups#index'
      
      resources :families, only: [:show]
      resources :orders, only: [:show]

      resources :observations, only: [:index]

      resources :birds, only: [] do
        resources :observations, only: [:create]
      end
    end
  end

  root to: 'pages#home'
  get '/*path', to: 'pages#home'
end
