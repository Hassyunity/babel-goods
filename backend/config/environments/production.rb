require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = false

  config.public_file_server.headers = { "cache-control" => "public, max-age=#{1.year.to_i}" }

  config.force_ssl = true
  config.log_tags = [:request_id]
  config.logger = ActiveSupport::TaggedLogging.logger(STDOUT)
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")

  config.active_support.report_deprecations = false
  config.cache_store = :solid_cache_store
  config.active_job.queue_adapter = :solid_queue
  config.solid_queue.connects_to = { database: { writing: :queue } }

  config.action_mailer.default_url_options = { host: ENV.fetch("FRONTEND_URL") }

  config.i18n.fallbacks = true
  config.active_record.dump_schema_after_migration = false
  config.active_record.attributes_for_inspect = [:id]

  config.hosts << ENV.fetch("API_HOST", "babel-goods-api.onrender.com")
  config.hosts << ENV.fetch("FRONTEND_HOST", "babel-goods-fr.onrender.com")

  # CORS pour le frontend en production
  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins ENV.fetch("FRONTEND_URL", "https://babel-goods-fr.onrender.com")
      resource '*', headers: :any,
        methods: %i[get post put patch delete options head]
    end
  end
end
