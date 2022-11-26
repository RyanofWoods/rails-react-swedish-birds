source 'https://rubygems.org'
git_source(:github) { |_repo| "https://github.com/#{repo}.git" }

ruby '3.0.4'

gem 'autoprefixer-rails'
gem 'bootsnap', '>= 1.15.0', require: false
gem 'devise'
gem 'font-awesome-sass'
gem 'jbuilder', '~> 2.7'
gem 'minitest-ci'
gem 'pg', '>= 0.18', '< 2.0'
gem 'pg_search'
gem 'puma', '~> 4.3'
gem 'rails', '~> 7.0.4'
gem 'sass-rails', '>= 6'
gem 'simple_form'
gem 'sprockets-rails'
gem 'turbolinks', '~> 5'
gem 'webpacker', '~> 4.0'

group :development, :test do
  gem 'dotenv-rails'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'rubocop', require: false
end

group :development do
  gem 'listen', '~> 3.2'
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'simplecov', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
