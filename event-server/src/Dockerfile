FROM node:18-alpine

# 작업 디렉토리 생성
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 복사
COPY . .

# 빌드
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]