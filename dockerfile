FROM php:7.4-cli

# Instalar extensiones necesarias
RUN docker-php-ext-install pdo pdo_mysql

# Opcional pero útil
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl

WORKDIR /var/www

