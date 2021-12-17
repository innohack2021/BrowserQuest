git pull
git checkout last
nohup redis-server &
nohup nodemon server.js &
nohup nodemon bin/start_dev_client.js &
