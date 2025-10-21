require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = false

  config.force_ssl = true
  config.assume_ssl = true

  config.public_file_server.headers = { "cache-control" => "public, max-age=#{1.year.to_i}" }

  config.log_tags = [:request_id]
  config.logger = ActiveSupport::TaggedLogging.logger(STDOUT)
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")

  config.cache_store = :solid_cache_store
  config.active_job.queue_adapter = :solid_queue
  config.solid_queue.connects_to = { database: { writing: :queue } }

  # ⚠️ Si tu n’utilises pas ActionMailer en prod, tu peux commenter cette ligne
  # config.action_mailer.default_url_options = { host: "babel-goods-api.onrender.com" }

  config.i18n.fallbacks = true
  config.active_record.dump_schema_after_migration = false
  config.active_record.attributes_for_inspect = [:id]

  config.hosts << "babel-goods-api.onrender.com"
  config.hosts << "babel-goods-fr.onrender.com"

  # ⚠️ CORS pour ton frontend prod
  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'https://babel-goods-fr.onrender.com'
      resource '*',
               headers: :any,
               methods: %i[get post put patch delete options head]
    end
  end
end
