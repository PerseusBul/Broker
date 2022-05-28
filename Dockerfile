FROM node:16.14.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli@13.1.2
RUN npm install -g npm@8.5.3
RUN npm install
COPY . .
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/projects /usr/share/nginx/html
