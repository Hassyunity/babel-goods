require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Reload code on each request (utile en dev)
  config.enable_reloading = true

  # Désactive le eager loading
  config.eager_load = false

  # Affiche les erreurs complètes
  config.consider_all_requests_local = true

  # Active le server timing
  config.server_timing = true

  # Cache désactivé par défaut
  config.action_controller.perform_caching = false
  config.cache_store = :memory_store

  # Dépréciations
  config.active_support.deprecation = :log

  # Erreur si migration en attente
  config.active_record.migration_error = :page_load

  # Logs SQL détaillés
  config.active_record.verbose_query_logs = true

  # Active le CORS (pour connexion avec React)
  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:5173'  # adapte selon ton port React (Vite)
      resource '*',
               headers: :any,
               methods: %i[get post put patch delete options head]
    end
  end

  # Comme on est en mode API, on ne charge ni ActionMailer ni ActiveStorage
end
