FROM alpine

RUN apk update && \
    apk add nodejs && \
    apk add nodejs-npm && \
    mkdir /app

WORKDIR /app

COPY . .

RUN npm install  && \ 
    chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]
