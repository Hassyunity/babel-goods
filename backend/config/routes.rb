Rails.application.routes.draw do
  namespace :api do
    resources :articles
    resources :commandes
    get "stats/capital_total", to: "stats#capital_total"
    get "stats/ventes_mensuelles", to: "stats#ventes_mensuelles"
    get "stats/repartition_stock", to: "stats#repartition_stock"
    get "stats/repartition_commandes", to: "stats#repartition_commandes" # optionnel
  end
end
