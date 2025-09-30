FROM node:18
WORKDIR /http-server
COPY . ./
RUN npm install
RUN chmod 755 ../http-server
#RUN mkdir ./uploads
#VOLUME ../http-server/uploads
EXPOSE 4000
CMD npm start
