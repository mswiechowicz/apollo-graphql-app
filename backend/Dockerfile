# Użyj gotowego obrazu node.js
FROM node:19

# Utwórz katalog /app w kontenerze
WORKDIR /app

# Skopiuj pliki źródłowe aplikacji do katalogu /app w kontenerze
COPY . .

# Zainstaluj zależności aplikacji
RUN npm install

# Udostępnij port 3000 na kontenerze
EXPOSE 3000

# Uruchom aplikację
CMD ["npm", "start"]
