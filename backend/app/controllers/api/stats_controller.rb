module Api
  class StatsController < ApplicationController
    # 🔹 Capital total de tous les articles
    def capital_total
      # Calcul effectué par la base : sum(prix_initiale * quantite)
      total = Article.sum(Arel.sql("prix_initiale * COALESCE(quantite, 0)"))
      render json: { capital: total.to_f }
    end

    # 🔹 Ventes mensuelles (total du prix des commandes par mois)
    def ventes_mensuelles
      data = Commande
        .group_by_month(:created_at, format: "%b", locale: :fr)
        .sum(:prix)
        .map { |mois, ventes| { mois: mois, ventes: ventes.to_f } }

      render json: data
    end

    # 🔹 Répartition du stock (quantité restante par article)
    def repartition_stock
      data = Article.all.map do |article|
        {
          name: article.nom,
          value: article.quantite
        }
      end

      render json: data
    end

    # 🔹 (Optionnel) Répartition des commandes par état
    def repartition_commandes
      data = Commande.group(:etat).count.map do |etat, count|
        {
          name: etat.capitalize,
          value: count
        }
      end

      render json: data
    end
  end
end
