module Api
  class ArticlesController < ApplicationController
    before_action :set_article, only: %i[show update destroy]

    # GET /api/articles
    def index
      render json: Article.all
    end

    # GET /api/articles/:id
    def show
      render json: @article
    end

    # POST /api/articles
    def create
      article = Article.new(article_params)
      article.reste ||= article.quantite

      if article.save
        render json: article, status: :created
      else
        render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /api/articles/:id
    def update
      # ⚙️ Si la quantité change sans mise à jour explicite du reste,
      # on ajuste automatiquement le reste
      if params[:article]&.key?(:quantite) && !params[:article].key?(:reste)
        difference = params[:article][:quantite].to_i - @article.quantite.to_i
        params[:article][:reste] = @article.reste.to_i + difference
      end

      if @article.update(article_params)
        render json: @article
      else
        render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /api/articles/:id
    def destroy
      @article.destroy
      head :no_content
    end

    def stocks
      articles = Article.select(:nom, :reste)
      render json: articles.map { |a| { name: a.nom, value: a.reste } }
    end

    private

    def set_article
      @article = Article.find(params[:id])
    end

    def article_params
      params.require(:article).permit(
        :nom, :prix_initiale, :prix_vente,
        :quantite, :reste, :status, :remarque
      )
    end
  end
end
