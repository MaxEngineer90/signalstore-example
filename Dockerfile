
FROM node:22-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .


RUN npm run build


FROM nginx:alpine

FROM nginx:alpine
COPY --from=builder /app/dist/signalstore-tutorial/browser /usr/share/nginx/html


ARG VERSION
LABEL version=${VERSION}

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
