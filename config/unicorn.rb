root = "/home/www/apps/ngo-china/current"
working_directory root
pid "#{root}/tmp/pids/unicorn_ngo-china.pid"
stderr_path "#{root}/log/unicorn_ngo-china.stderr.log"
stdout_path "#{root}/log/unicorn_ngo-china.log"

listen "/tmp/unicorn_ngo-china.blog.sock"
worker_processes 4
timeout 30
#preload_app true