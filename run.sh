git pull
git checkout last
nohup redis-server &
forever start server.js & >& log.txt
