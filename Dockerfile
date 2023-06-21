
    FROM node:18.16.0

    RUN groupadd -r appuser && useradd -r -g appuser appuser
    USER appuser

    WORKDIR /app
    COPY package*.json /app/
    RUN npm install
    COPY . /app

    EXPOSE 3000

    CMD [ "npm", "start" ]