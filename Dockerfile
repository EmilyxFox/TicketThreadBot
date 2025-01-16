FROM node:17 AS builder


WORKDIR /app

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:17 AS production

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json .

COPY prisma ./prisma

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

RUN npx prisma generate

CMD ["npm", "run", "start:prod"]
