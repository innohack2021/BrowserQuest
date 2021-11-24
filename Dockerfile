FROM debian:9.11

RUN apt update -y
RUN apt upgrade -y
RUN apt install  curl vim git -y
RUN apt install g++ make memcached libncurses5 redis-server -y

# node install
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt install nodejs -y

# api server
RUN git clone https://github.com/SangheonYi/mentta_express.git
WORKDIR mentta_express
RUN npm install -d

WORKDIR ../

# BrowserQuest
RUN git clone https://github.com/SangheonYi/BrowserQuest.git
WORKDIR BrowserQuest
RUN npm install -d

EXPOSE 8000:8000
EXPOSE 8080:8080
EXPOSE 8081:8081
