FROM alpine

RUN apk update && \
    apk add nodejs && \
    apk add nodejs-npm && \
    apk add mongodb && \
    apk add --no-cache git && \
    mkdir /app && \
    mkdir /data && \
    mkdir /data/db && \
    npm install nodemon -g

WORKDIR /app

COPY . .

RUN chmod +x start.sh && \ 
    npm install 

EXPOSE 8000

CMD ["./start.sh"]
