git pull
git checkout last
nohup redis-server &
forever start server.js & >& log.txt
cd ../mentta_express
forever start app.js >& log.txt
