FROM debian:9.11

RUN apt update -y
RUN apt upgrade -y
RUN apt install  curl vim git procps -y
RUN apt install g++ make memcached libncurses5 redis-server -y

# node install
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt install nodejs -y

# api server
RUN git clone https://github.com/SangheonYi/mentta_express.git
WORKDIR mentta_express
RUN npm install -d
RUN npm install -g nodemon

WORKDIR ../

# BrowserQuest
RUN git clone https://github.com/innohack2021/mentta.git
WORKDIR mentta
RUN git pull
RUN git checkout last
RUN npm install -g forever

EXPOSE 8000:8000
EXPOSE 8080:8080
EXPOSE 8081:8081

CMD bash run.sh && tail -f /dev/null
