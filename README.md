# Event Connection Platform

A real-time event management platform enabling users to create, manage, and participate in events with real-time communication.

## Features
- Login, Sign-Up
- User Authentication (JWT, Bcrypt)
- Role-Based Access Control
- Event Creation & Filtering
- Real-Time Friend Requests
- Live Chat in Event Lobbies
- WebSocket-based Communication
- Private Messaging

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT, Bcrypt
- **Real-time Communication:** Socket.IO, WebSockets, Redis
- **Deployment & Management:** Docker, PM2
- **Frontend:** React.js, Vite, Tailwind CSS

## Responsibilities
### Backend
- Developed all backend APIs
- Integrated Socket.IO for real-time chat
- Implemented JWT authentication
- Designed event filtering & management
- Optimized WebSockets using Redis
- Deployed backend on Render

### Frontend
- Built the user interface with React.js and Vite
- Designed responsive UI using Tailwind CSS
- Implemented event filtering and creation features
- Integrated WebSockets for real-time interactions
- Connected frontend with backend APIs
- Ensured smooth user experience with error handling

## Installation & Setup
### Prerequisites
- Node.js (v16+)
- MongoDB
- Redis (for WebSocket optimization)

### Backend Setup
```sh
cd backend
npm install
npm start
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

## API Endpoints
### Authentication API
#### **Base URL**
```
https://two447-event-connection-platform-2.onrender.com
```

#### **1. Signup**
**URL**: `/user/signup`

**Method**: `POST`

**Headers**:
`Content-Type`: `application/json`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "role": "participant"
}
```

**Response (Success 201)**:
```json
{
  "msg": "Your Account Created Successfully",
  "payload": {
    "_id": "userId",
    "email": "user@example.com",
    "role": "participant",
    "createdAt": "timestamp"
  }
}
```

#### **2. Login**
**URL**: `/user/login`

**Method**: `POST`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (Success 200)**:
```json
{
  "message": "Login successful",
  "accessToken": "JWT Access Token",
  "user": {
    "id": "userId",
    "email": "user@example.com",
    "role": "participant"
  }
}
```

#### **3. Refresh Token**
**URL**: `/user/refresh`

**Method**: `POST`

**Response (Success 200)**:
```json
{
  "accessToken": "New JWT Access Token"
}
```

#### **4. Logout**
**URL**: `/user/logout`

**Method**: `POST`

**Response (Success 204)**:
No content. Refresh token cleared from cookies.

### Event API
#### **5. Create Event**
**URL**: `/events`

**Method**: `POST`

**Headers**:
`Authorization`: `Bearer <AccessToken>`

**Request Body**:
```json
{
  "name": "Tech Conference",
  "location": "City Center",
  "description": "Annual tech conference for developers.",
  "startDate": "2025-02-01T10:00:00Z",
  "endDate": "2025-02-01T18:00:00Z",
  "category": ["technology"],
  "imageUrl": "http://example.com/event-image.jpg"
}
```

**Response (Success 201)**:
```json
{
  "message": "Event created successfully",
  "event": {
    "id": "eventId",
    "name": "Tech Conference",
    "location": "City Center",
    "createdBy": "userId"
  }
}
```

#### **6. Get All Events**
**URL**: `/events`

**Method**: `GET`

**Response (Success 200)**:
```json
{
  "events": [
    {
      "id": "eventId",
      "name": "Tech Conference",
      "location": "City Center",
      "startDate": "2025-02-01T10:00:00Z",
      "endDate": "2025-02-01T18:00:00Z",
      "category": ["technology"]
    }
  ]
}
```

## Deployment
The backend is deployed on **Render** and can be accessed at:
```
https://two447-event-connection-platform-2.onrender.com
```
The frontend is deployed on **Vercel** and can be accessed at:
```
https://silver-piroshki-ab1de7.netlify.app/
```

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.

## Contact
For any queries, reach out via GitHub or email.

