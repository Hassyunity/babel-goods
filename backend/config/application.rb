require_relative "boot"

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"

# Pas besoin de action_view, action_mailer, active_storage ou sprockets ici

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.load_defaults 8.0
    config.api_only = true

    # Ignorer les dossiers inutiles dans /lib
    config.autoload_lib(ignore: %w[assets tasks])
  end
end
