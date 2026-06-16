
FROM nginxinc/nginx-unprivileged:alpine-slim


COPY default.conf /etc/nginx/conf.d/default.conf


COPY ./html /usr/share/nginx/html


USER 101


EXPOSE 8080


CMD ["nginx", "-g", "daemon off;"]
