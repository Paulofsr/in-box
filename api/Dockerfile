FROM alpine:3.6

RUN apk update && \
    apk add nodejs && \
    apk add nodejs-npm && \
    mkdir /app && \
    npm install nodemon -g

WORKDIR /app

COPY . .

RUN chmod +x start.sh && \ 
    npm install 

EXPOSE 8000

CMD ["./start.sh"]
