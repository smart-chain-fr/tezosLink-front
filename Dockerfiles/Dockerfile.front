# Install dependencies only when needed
FROM node:19-alpine AS deps 

WORKDIR tezosLink

COPY package.json ./

RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:19-alpine AS builder

WORKDIR tezosLink

COPY . . 
COPY --from=deps tezosLink/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:19-alpine AS production

WORKDIR tezosLink

RUN adduser -D tezoslinkuser --uid 10000 && chown -R tezoslinkuser .

COPY --from=builder --chown=tezoslinkuser tezosLink/node_modules ./node_modules
COPY --from=builder --chown=tezoslinkuser tezosLink/public ./public
COPY --from=builder --chown=tezoslinkuser tezosLink/.next ./.next
COPY --from=builder --chown=tezoslinkuser tezosLink/next.config.js ./next.config.js
COPY --from=builder --chown=tezoslinkuser tezosLink/package.json ./package.json
USER tezoslinkuser

CMD ["npm", "run", "start"]
EXPOSE 3000
