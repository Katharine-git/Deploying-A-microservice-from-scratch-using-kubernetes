FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm ci --production
COPY . .
ENV PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://localhost:3000/healthz || exit 1
CMD ["node", "src/index.js"]
