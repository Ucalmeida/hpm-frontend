FROM nginx:1.19-alpine

COPY build /usr/share/nginx/html

EXPOSE 9000

CMD ["nginx", "-g", "daemon off;"]