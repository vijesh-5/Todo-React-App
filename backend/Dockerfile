FROM node:18 
#official node js

WORKDIR /app
#setting working directory 

COPY package*.json ./
# cpy package.jason & package-lock jason

RUN npm install
#install node

#cpy rest
COPY . .

#expose backend port
EXPOSE 5000

#start backend server
CMD [ "node" , "server.js" ]
