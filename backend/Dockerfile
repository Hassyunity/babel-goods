# 📦 Image de base Ruby
FROM ruby:3.2

# Installation des dépendances système
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    npm \
    git \
    curl

# Installation de Yarn
RUN npm install -g yarn

# Répertoire de travail
WORKDIR /app

# Copie des fichiers Gemfile pour l'installation des gems
COPY Gemfile Gemfile.lock ./

# Installation des gems
RUN bundle install

# Copie de tout le code de l'application
COPY . .

# Précompilation des assets (optionnel si tu n'as pas de frontend Rails)
RUN RAILS_ENV=production bundle exec rails assets:precompile || echo "No assets to compile"

# Commande de démarrage : migrate + server
CMD ["bash", "-c", "bundle exec rails db:migrate && bundle exec rails s -p $PORT -b 0.0.0.0"]
