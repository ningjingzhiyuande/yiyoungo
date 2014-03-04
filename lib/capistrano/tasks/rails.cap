namespace :rails do
  desc "Open the rails console on each of the remote servers"
  task :console do
    on roles(:app) do |host| #does it for each host, bad.
      rails_env = fetch(:stage)
      execute_interactively "bundle exec rails console #{rails_env}"  
    end
  end
 
  desc "Open the rails dbconsole on each of the remote servers"
  task :dbconsole do
    on roles(:db) do |host| #does it for each host, bad.
      rails_env = fetch(:stage)
      execute_interactively "ruby #{current_path}/script/rails dbconsole #{rails_env}"  
    end
  end
 
  def execute_interactively(command)
    user = fetch(:deploy_user)
    port = fetch(:port) || 22
    exec "ssh -l #{user} #{host} -p #{port} -t 'cd #{deploy_to}/current && #{command}'"
  end
end

# run a command in the `current` directory of `deploy_to`
def run_interactively(command)
  # select a random server to run on
  server = find_servers_for_task(current_task).sample
  # Import the default environment, cd to the currently deployed app, run the command
  command = %Q(ssh -tt -i #{ssh_options[:keys]} #{user}@#{server} "bash -c 'cd #{deploy_to}/current; #{command}'")
  puts command
  exec command
end

namespace :rails do
  desc "rails console"
  task :console do
    on role(:app) do
      run_interactively "bundle exec rails console production"
    end
  end
end