Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do
    get '/search', to: 'search#index'

    resources :orders, :families, only: :index

    resources :species, only: :index do
      resources :observations, only: [:create]
    end

    resources :observations, only: [:index, :update]
    resources :users, only: [:index]
  end

  root to: 'pages#react'
  get '/*path', to: 'pages#react'
end
