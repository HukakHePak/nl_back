FROM node:16-slim as build
COPY . .
RUN npm i 
RUN npx webpack && npx pkg --o build/setup -t node14-linuxstatic -C GZip ./build/server.js

FROM scratch
COPY --from=build build/setup .
CMD ["./setup"]