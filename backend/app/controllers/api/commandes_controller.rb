module Api
  class CommandesController < ApplicationController
    before_action :set_commande, only: %i[show update destroy]

    # GET /api/commandes
    def index
      commandes = Commande.includes(:article).all
      render json: commandes.as_json(
        except: [:updated_at],
        methods: [:nom_article, :article_prix_vente, :quantite]
      )
    end

    # GET /api/commandes/:id
    def show
      render json: @commande.as_json(
        include: { article: { only: [:nom, :prix_vente] } }
      )
    end

    # POST /api/commandes
    def create
      commande = Commande.new(commande_params)
      if commande.save
        render json: commande, status: :created
      else
        render json: { errors: commande.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /api/commandes/:id
    def update
      if @commande.update(commande_params)
        render json: @commande
      else
        render json: { errors: @commande.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /api/commandes/:id
    def destroy
      @commande.destroy
      head :no_content
    end

    private

    def set_commande
      @commande = Commande.find(params[:id])
    end

    def commande_params
      params.require(:commande).permit(
        :article_id,
        :nom_personne,
        :adresse_livraison,
        :province,
        :prix,
        :telephone,
        :etat,
        :remarque,
        :nombre_articles
      )
    end
  end
end
