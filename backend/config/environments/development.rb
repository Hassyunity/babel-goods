require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Recharge le code à chaque requête (utile en développement)
  config.enable_reloading = true

  # Désactive le eager loading pour un démarrage plus rapide
  config.eager_load = false

  # Affiche les erreurs complètes dans le navigateur
  config.consider_all_requests_local = true

  # Active le Server-Timing pour mesurer les performances dans le navigateur
  config.server_timing = true

  # Désactive le cache
  config.action_controller.perform_caching = false
  config.cache_store = :memory_store

  # Dépréciations dans les logs
  config.active_support.deprecation = :log
  config.active_support.disallowed_deprecation = :raise
  config.active_support.disallowed_deprecation_warnings = []

  # Erreur si migration en attente
  config.active_record.migration_error = :page_load

  # Logs SQL détaillés
  config.active_record.verbose_query_logs = true

  # CORS : autoriser le frontend React local
  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:5173'  # adapte selon ton port React (Vite)
      resource '*',
               headers: :any,
               methods: %i[get post put patch delete options head]
    end
  end

  # Autorise aussi ton domaine Render en dev (utile si tu testes ton backend en ligne)
  config.hosts << "babel-goods.onrender.com"
  config.hosts << "babel-goods-frontend.onrender.com"
end
