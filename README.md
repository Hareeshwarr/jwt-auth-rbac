# Secure User Authentication with Role-Based Access Control

JWT authentication system with face verification, React frontend, and Spring Boot backend.

## Features

- **Face verification** before login
- **JWT authentication** with role-based access (User, Moderator, Admin)
- **React + Vite** frontend with dashboards
- **Spring Boot** backend with Spring Security

## Project Structure

```
code/
├── RFrontEnd/          # React frontend
└── spring-boot-.../    # Spring Boot backend
```

## Quick Start

### Backend
```bash
cd code/spring-boot-spring-security-jwt-authentication-master_spring-boot-spring-security-jwt-authentication-master
export JAVA_HOME="/opt/homebrew/opt/openjdk@21"  # or your Java 17+ path
mvn spring-boot:run
```

### Frontend
```bash
cd code/RFrontEnd
npm install
npm run dev
```

### Access
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8080

## Hosting

- **Frontend:** Deploy to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or GitHub Pages
- **Backend:** Deploy to [Railway](https://railway.app), [Render](https://render.com), or similar

Update `axiosconfig.js` baseURL when deploying to match your backend URL.
