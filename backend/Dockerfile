FROM node:lts
COPY . /app
WORKDIR /app
RUN npm i
ENV BACKEND_PORT 3301
ENV SECRET_KEY "2d6bffa6-3b96-4a26-b211-5434b18e6115"
ENV DATABASE_URL "postgresql://docker:docker@db:5432/myapp?schema=public"
RUN npx prisma generate
CMD ["npm", "run", "dev"]
EXPOSE 3301