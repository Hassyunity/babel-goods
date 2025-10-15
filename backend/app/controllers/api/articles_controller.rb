module Api
  class ArticlesController < ApplicationController
    before_action :set_article, only: %i[show update destroy]

    # GET /api/articles
    def index
      articles = Article.all
      render json: articles
    end

    # GET /api/articles/:id
    def show
      render json: @article
    end

    # POST /api/articles
    def create
      article = Article.new(article_params)
      if article.save
        render json: article, status: :created
      else
        render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /api/articles/:id
    def update
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

    private

    def set_article
      @article = Article.find(params[:id])
    end

    def article_params
      params.require(:article).permit(:nom, :prix_initiale, :prix_vente, :quantite, :status, :remarque)
    end
  end
end
