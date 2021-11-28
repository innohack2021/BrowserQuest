# Mentta-BrowserQuest

Mentta-BrowserQuest는 오픈소스 게임 엔진인 BrowserQuest를 기반으로 제작한 메타버스 게임 엔진입니다.

네 가지 주요 부분이 있으며, 위의 세 부분은 기존 BrowserQuest와 유사하고, 클라우드 AI 서비스 적용을 위한 API 서버가 추가되었습니다.

- 서버 : Node.js
- 클라이언트 : 브라우저에서 JavaScript 사용
- 데이터베이스 : Redis
- **API 서버** : Node.js ([깃허브 링크](https://github.com/SangheonYi/mentta_express.git))

본 개발문서는 실행 방법과 수정된 부분에 대해 안내하며, 수정되지 않은 부분의 기존의 정보는 [BrowserQuest 깃허브](https://github.com/browserquest/BrowserQuest.git)에서 확인할 수 있습니다.

### 주요 수정사항

- 뭐를 뭐하도록 수정, 주어진 타일을 맵 안에 설치할 수 있도록 변경했습니다.
- client의 NPC 대화 발생 부분을 수정해 NPC가 사용자의 대화를 인식할 수 있게 하고, [별도 개발한 API 서버](https://github.com/SangheonYi/mentta_express.git)를 통해 CLOVA AI 챗봇을 적용, NPC와 사용자 간 대화가 가능하도록 하였습니다.
- 특정 좌표에서 공간이동 이벤트가 발생했을 때, Docker 컨테이너를 통해 사전 build된 이미지를 이용하여 웹사이트를 실행할 수 있도록 변경했습니다.
- Client와 Server를 분리하여 실행하도록 함으로써 실행 속도를 높였습니다.

## 브라우저 지원 여부

(본 수정본은 Chrome(정상 동작) 및 IE 10.x(동작하지 않음)만 확인한 상태이며, 아래는 기존 Browserquest의 지원 여부입니다)

- **정상 동작** : Firefox, Chrome, Chromium, Opera 15.x
- **배경음악 X / 속도 문제** : Opera 12.16
- **배경음악 X** : Safari 6.x
- **동작하지 않음** : IE 10.x

## 실행 방법

### 실제 서버에서 실행

1. **본 레포지토리와 [API 서버 레포지토리](https://github.com/SangheonYi/mentta_express.git)**에서 필요한 파일을 모두 내려받은 후, 다음 명령어를 통해 필요한 환경을 구축해 줍니다.

```bash
apt-get update -y
apt-get upgrade -y
apt-get install  curl git -y #debian에는 curl을 별도 설치해야 함
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install nodejs -y #nodejs 설치
apt-get install g++ make memcached libncurses5 redis-server -y 
git clone git://github.com/browserquest/BrowserQuest.git
cd BrowserQuest
npm install -d
```

2. redis 서버를 실행합니다.

```bash
redis-server
```

3. 새 터미널을 열어 아래 명령으로 서버 node를 실행합니다.

```bash
nodemon server.js
```

정상적으로 실행되면 아래와 같이 출력됩니다.

```bash
$ nodemon server.js
This server can be customized by creating a configuration file named: ./server/config_local.json
[Thu Sep 13 2012 17:16:27 GMT-0400 (EDT)] INFO Starting BrowserQuest game server...
[Thu Sep 13 2012 17:16:27 GMT-0400 (EDT)] INFO world1 created (capacity: 200 players).
[Thu Sep 13 2012 17:16:27 GMT-0400 (EDT)] INFO world2 created (capacity: 200 players).
[Thu Sep 13 2012 17:16:27 GMT-0400 (EDT)] INFO world3 created (capacity: 200 players).
[Thu Sep 13 2012 17:16:27 GMT-0400 (EDT)] INFO world4 created (capacity: 200 players).
[Thu Sep 13 2012 17:16:27 GMT-0400 (EDT)] INFO world5 created (capacity: 200 players).
[Thu Sep 13 2012 17:16:27 GMT-0400 (EDT)] INFO Server (everything) is listening on port 8000
```

4. 다시 새 터미널을 열어 아래의 명령으로 client `node` 를 실행합니다.

```bash
nodemon bin/start_dev_client.js
```

정상적으로 실행되면 아래와 같이 출력됩니다.

```bash
$ nodemon bin/start_dev_client.js
BrowserQuest client server started on port 8080
```

5. 마지막으로, 새 터미널에서 아래의 명령으로 API 서버를 실행합니다.

```bash
nodemon app.js
```

### Docker를 이용한 실행

사용자 PC에서 위와 같이 실행할 경우, 기존의 파일과 충돌이 발생해 제대로 실행되지 않을 수 있습니다. 따라서 실제 호스팅이 아닌 테스트를 위해서라면 Docker를 이용해 컨테이너에서 실행하는 것이 좋은 방법일 수 있습니다.

1. 본 레포지토리를 clone한 후, 해당 디렉토리에서 아래 명령어로 Dockerfile을 실행하여 Image를 생성합니다.

```bash
docker build . -t (생성할 이미지 이름)
```

2. 이미지가 생성되면 아래 명령어로 컨테이너를 실행시킵니다.

```bash
docker run -it -p 8000:8000 -p 8080:8080 -p 8081:8081 --name (생성할 컨테이너 이름) (사용할 이미지 이름)
```

3. 이후 실제 서버에서와 동일하게 진행하되, 새 터미널을 연 후 다음 명령어로 컨테이너 쉘을 실행해야 합니다.

```bash
docker exec -it (컨테이너 이름) bash
```

위의 실행 과정을 거친 후, 브라우저에서 [localhost:8080](http://localhost:8080)로 이동하면 아래 화면이 뜨며 게임이 실행됩니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/00077f35-279a-4412-8a0d-5711d7c8a3cc/Untitled.png)

## 맵에 타일 설치

### 개요

다음과 같이 맵에 타일을 추가할 수 있습니다.

(gif)

### 사용 방법

**블럭 생성**

- 대화창에 a를 입력하면, 블럭을 생성할 수 있는 상태가 되며, 이동이 불가능해집니다.
- 이 상태에서(...)

### 개발 방법

- 무슨무슨 파일에 클래스 이런걸 추가했습니다. (사진 또는 코드)
- 무슨무슨 액션(데이터 서버에서 클라로 전달, 도커 실행 등등..)을 위해 무슨무슨 파일을 추가로 작성했습니다

### 확장

- 이러한 방식으로 올릴 타일을 변경할 수 있습니다.
- 

## 텔레포트 시 Docker Container로 웹사이트 실행

### 개요

특정 좌표로 텔레포트 시, 사용자가 선택한 웹사이트가 실행됩니다.

### 사용 방법

**블럭 생성**

- 대화창에 a를 입력하면, 블럭을 생성할 수 있는 상태가 되며, 이동이 불가능해집니다.
- 이 상태에서(...)

### 개발 방법

- 무슨무슨 파일에 클래스 이런걸 추가했습니다. (사진 또는 코드)
- 무슨무슨 액션(데이터 서버에서 클라로 전달, 도커 실행 등등..)을 위해 무슨무슨 파일을 추가로 작성했습니다. 등

### 확장

- 이러한 방식으로 띄울 웹사이트를 변경할 수 있습니다.
- 

## NPC에 AI챗봇 적용

### 개요

클라우드 AI 챗봇을 NPC에 적용, 아래와 같이 직업군별로 대화를 나눌 수 있습니다. ([깃허브 링크](https://github.com/SangheonYi/mentta_express.git))

(gif) 

### 사용 방법

- NPC와 접촉해 Welcome 메시가 뜬다면, NPC와 대화할 수 있는 상태가 됩니다.
- NPC와 접촉을 유지한 상태로, 하단의 메시지 버튼을 클릭하거나 엔터 키를 눌러, NPC에 할 말을 입력하면, 잠시 후 NPC가 대답합니다.

### 개발 방법

- Clova chatbot api 서버(https://github.com/SangheonYi/mentta_express.git)를 작성하여 ai chatbot과 대화 메시지를 주고 받을 수 있도록 했습니다.

### 확장

- http 통신을 사용하는 api라면 요청 메시지 작성, 응답 메시지 파싱 부분만 수정해서 다른 ai chatbot을 적용할 수 있습니다.

## To-do

- 텔레포트할 수 있는 좌표를 사용자가 임의로 설정할 수 있게 만들고자 합니다.
-
