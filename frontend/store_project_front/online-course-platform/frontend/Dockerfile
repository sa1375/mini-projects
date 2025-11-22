# مرحله 1: نصب dependencyها
FROM node:24 AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# مرحله 2: اجرای dev
FROM node:24
WORKDIR /app

# فقط سورس کدتو کپی کن
COPY . .

# node_modules رو از مرحله قبل بیار (و به bind mount وابسته نباش)
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]

