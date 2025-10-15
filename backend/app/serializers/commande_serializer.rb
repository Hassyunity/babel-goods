class CommandeSerializer < ActiveModel::Serializer
  attributes :id, :nom_article, :nom_personne, :adresse_livraison,
             :province, :prix, :telephone, :etat, :remarque, :created_at

  def nom_article
    object.article.nom
  end
end
