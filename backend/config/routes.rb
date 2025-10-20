Rails.application.routes.draw do
  namespace :api do
    resources :articles do
      collection do
        get :stocks
      end
    end

    resources :commandes

    namespace :stats do
      get :capital_total
      get :ventes_mensuelles
      get :repartition_stock
      get :repartition_commandes
    end
  end
end
