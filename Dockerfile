FROM node
EXPOSE 4500
WORKDIR /app
COPY . .
RUN npm i 
CMD npm run start