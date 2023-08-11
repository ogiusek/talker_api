# docker build -t talker_api -f talker_api.dockerfile .
# docker run -p 8080:8080 -d talker_api

FROM node:16

WORKDIR /app
COPY . /app

RUN npm i
RUN npm i -g typescript

EXPOSE 8080

LABEL repository="ogiusek/talker_api"

CMD ["npm", "start"]
