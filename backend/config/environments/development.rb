require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = true
  config.eager_load = false
  config.consider_all_requests_local = true

  config.server_timing = true
  config.action_controller.perform_caching = false
  config.cache_store = :memory_store

  config.active_support.deprecation = :log
  config.active_support.disallowed_deprecation = :raise
  config.active_support.disallowed_deprecation_warnings = []

  config.active_record.migration_error = :page_load
  config.active_record.verbose_query_logs = true

  # ⚠️ CORS pour ton frontend local
  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:5173'
      resource '*',
               headers: :any,
               methods: %i[get post put patch delete options head]
    end
  end

  config.hosts << "babel-goods-api.onrender.com"
  config.hosts << "babel-goods-fr.onrender.com"
end
