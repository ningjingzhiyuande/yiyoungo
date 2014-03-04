# config valid only for Capistrano 3.1
lock '3.1.0'

#server "192.81.135.229", :web, :app, :db, primary: true

set :application, "ngo-china"
set :default_stage, "production"
set :user, "www"
set :deploy_to, "/home/#{fetch :user}/apps/#{fetch :application}"
set :deploy_via, :remote_cache
set :use_sudo, false
set :pty,true
#set :bundle_flags, "--deployment --quiet"

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
    source: "config/unicorn_init.sh",
    link: "/etc/init.d/unicorn_#{fetch(:full_app_name)}"
  }
])

SSHKit.config.command_map.prefix[:rake].push("bundle exec")

namespace :deploy do
	 
 
   before :deploy, "deploy:check_revision"
  # only allow a deploy with passing tests to deployed
   #before :deploy, "deploy:run_tests"
  # compile assets locally then rsync
   after 'deploy:symlink:shared', 'deploy:compile_assets_locally'
   after :finishing, 'deploy:cleanup'
   before :finished ,'deploy:restart'

  end
  
 

 # after "deploy:check", "deploy:setup_config"

  
end


# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end



# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Default deploy_to directory is /var/www/my_app
# set :deploy_to, '/var/www/my_app'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
#

