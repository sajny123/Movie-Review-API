# Movie Review API

A simple Movie Review API built with **Node.js**, **Express**, and **JWT authentication**.

---

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root with the following:**
   ```env
   ACCESS_TOKEN_SECRET=<your_access_token_secret>
   REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
   ```

4. **Start the servers**
   ```bash
   node authServer.js
   node server.js
   ```

---

## API Endpoints

### 1. Register a User  
**POST** `http://localhost:4000/users`  
**Headers:**  
`Content-Type: application/json`  
**Body:**
```json
{
  "name": "alice",
  "password": "password123"
}
```

---

### 2. Login  
**POST** `http://localhost:4000/login`  
**Headers:**  
`Content-Type: application/json`  
**Body:**
```json
{
  "name": "alice",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "<JWT_ACCESS_TOKEN>",
  "refreshToken": "<JWT_REFRESH_TOKEN>"
}
```

---

### 3. Add a Movie  
**POST** `http://localhost:3000/movies`  
**Headers:**  
`Authorization: Bearer <JWT_ACCESS_TOKEN>`  
`Content-Type: application/json`  
**Body:**
```json
{
  "title": "Inception",
  "review": "Mind-bending sci-fi",
  "rating": "5/5"
}
```

---

### 4. Get All Movies  
**GET** `http://localhost:3000/movies`  
**Headers:**  
`Authorization: Bearer <JWT_ACCESS_TOKEN>`  
**Response:**
```json
[
  {
    "title": "Inception",
    "review": "Mind-bending sci-fi",
    "rating": "5/5"
  }
]
```

---

### 5. Get a Specific Movie  
**GET** `http://localhost:3000/movies/Inception`  
**Headers:**  
`Authorization: Bearer <JWT_ACCESS_TOKEN>`  
**Response:**
```json
{
  "title": "Inception",
  "review": "Mind-bending sci-fi",
  "rating": "5/5"
}
```
