# 📦 Image de base Ruby
FROM ruby:3.2

# Installation des dépendances système
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs npm

# Installation de Yarn
RUN npm install -g yarn

# Répertoire de travail
WORKDIR /app

# Copie des fichiers nécessaires
COPY Gemfile Gemfile.lock ./

# Installation des gems
RUN bundle install

# Copie du code
COPY . .

# Précompilation des assets
RUN RAILS_ENV=production bundle exec rails assets:precompile || echo "No assets to compile"

# Commande de démarrage
CMD ["bash", "-c", "bundle exec rails db:migrate && bundle exec rails s -p $PORT -b 0.0.0.0"]
