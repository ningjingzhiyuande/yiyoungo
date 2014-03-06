# config valid only for Capistrano 3.1
lock '3.1.0'

#server "192.81.135.229", :web, :app, :db, primary: true

set :application, "ngo-china"
set :full_app_name, "#{fetch(:application)}"
set :default_stage, "production"
set :user, "www"
set :deploy_to, "/home/#{fetch :user}/apps/#{fetch :application}"
set :deploy_via, :remote_cache
set :use_sudo, false
set :pty,true
#set :bundle_flags, "--no-deployment"

set :scm, "git"
set :repo_url, "git@github.com:shiguodong/yiyoungo.git"
set :branch, "master"
set :keep_releases, 5

#set :rbenv_type, :user # or :system, depends on your rbenv setup
set :rbenv_ruby, '2.0.0-rc1'
#set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
#set :rbenv_map_bins, %w{rake gem bundle ruby rails}
#set :rbenv_roles, :all # default value

set :linked_files, %w{
  .ruby-version .rbenv-gemsets config/database.yml
}

set :linked_dirs, %w{public/system public/uploads tmp/pids tmp/cache tmp/sockets}

set :default_env, { path: "$HOME/.rbenv/shims:$HOME/.rbenv/bin:$PATH" }
set :keep_releases, 5



set(:config_files, %w(
  config/nginx.conf
  config/unicorn_init.sh
))

# which config files should be made executable after copying
# by deploy:setup_config
set(:executable_config_files, %w(
  unicorn_init.sh
))

# files which need to be symlinked to other parts of the
# filesystem. For example nginx virtualhosts, log rotation
# init scripts etc.
set(:symlinks, [
  {
    source: "config/nginx.conf",
    link: "/etc/nginx/sites-enabled/#{fetch(:full_app_name)}"
  },
  {
  	source: ".ruby-version",
    link: "/#{release_path}/.ruby-version"
  },
  {
  	source: ".rbenv-gemsetsn",
    link: "/#{release_path}/.rbenv-gemsets"
  },

  {
  	source: "config/database.yml",
    link: "/#{release_path}/config/#{fetch(:full_app_name)}"
  },
  {
    source: "config/unicorn_init.sh",
    link: "/etc/init.d/unicorn_#{fetch(:full_app_name)}"
  }
])

SSHKit.config.command_map.prefix[:rake].push("bundle exec")

namespace :deploy do

    before :deploy, "deploy:setup_config"
    before  :updated,"bundler:install"
  # only allow a deploy with passing tests to deployed
   #before :deploy, "deploy:run_tests"
  # compile assets locally then rsync
   #after 'deploy:symlink:shared', 'deploy:compile_assets_locally'
   after :finishing, 'deploy:cleanup'
   before :finished ,'deploy:restart'



 # after "deploy:check", "deploy:setup_config"

  
end


