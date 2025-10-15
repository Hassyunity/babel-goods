Rails.application.routes.draw do
  namespace :api do
    resources :articles
    resources :commandes
  end
end
