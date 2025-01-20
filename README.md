# 2447_Event_Connection_Platform

https://excalidraw.com/#json=jMn0uLZL8AlOikqdCB17M,MGbmp7mjXYTE1jciMu56Zg



# Backend Documentation for Event Connection Platform

## Overview
The Event Connection Platform facilitates seamless interactions during social gatherings, focusing on user authentication, event management, and participant registration. This documentation outlines the APIs, their usage, and additional backend functionalities.

---

### **Base URL**

```
https://two447-event-connection-platform-2.onrender.com
```

---

## **Endpoints**

### **1. Signup**

Create a new user account.

**URL**: `/user/signup`

**Method**: `POST`

**Headers**:

`Content-Type`: `application/json`

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "role": "participant" // Optional: "participant" or "organizer". Defaults to "participant"
}
```

**Response**:

- **Success (201)**:

```json
{
  "msg": "Your Account Created Successfully",
  "payload": {
    "_id": "userId",
    "email": "user@example.com",
    "password": "hashedPassword",
    "role": "participant",
    "createdAt": "timestamp"
  }
}
```

- **Error (400)**: Missing fields or duplicate email.

```json
{
  "msg": "All fields are required"
}
```

```json
{
  "message": "User with email already exists"
}
```

- **Error (500)**: Server issue.

```json
{
  "message": "Internal Server Error"
}
```

---

### **2. Login**

Authenticate a user and generate tokens.

**URL**: `/user/login`

**Method**: `POST`

**Headers**:

`Content-Type`: `application/json`

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response**:

- **Success (200)**:

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

- **Error (400)**: Missing fields.

```json
{
  "msg": "All fields are required"
}
```

- **Error (404)**: User not found.

```json
{
  "msg": "User not found"
}
```

- **Error (401)**: Invalid credentials.

```json
{
  "msg": "Invalid credentials"
}
```

- **Error (500)**: Server issue.

```json
{
  "message": "Server error",
  "error": "Error message"
}
```

---

### **3. Refresh Token**

Generate a new access token using the refresh token.

**URL**: `/user/refresh`

**Method**: `POST`

**Headers**:

`Content-Type`: `application/json`

`Cookie`: `refreshToken=RefreshTokenValue`

**Response**:

- **Success (200)**:

```json
{
  "accessToken": "New JWT Access Token"
}
```

- **Error (401)**: Missing refresh token.

```json
{
  "message": "Refresh token not provided"
}
```

- **Error (403)**: Invalid or expired refresh token.

```json
{
  "message": "Invalid or expired refresh token"
}
```

---

### **4. Logout**

Invalidate the refresh token.

**URL**: `/user/logout`

**Method**: `POST`

**Headers**: None

**Response**:

- **Success (204)**: No content. Refresh token cleared from cookies.

- **Error (500)**: Server issue.

---

### **5. Create Event**

Create a new event. Only accessible to authenticated organizers.

**URL**: `/events`

**Method**: `POST`

**Headers**:

`Authorization`: `Bearer <AccessToken>`

`Content-Type`: `application/json`

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

**Response**:

- **Success (201)**:

```json
{
  "message": "Event created successfully",
  "event": {
    "id": "eventId",
    "name": "Tech Conference",
    "location": "City Center",
    "category": ["technology"],
    "createdBy": "userId"
  }
}
```

- **Error (400)**: Validation errors.

```json
{
  "message": "Validation failed",
  "error": "Missing required fields"
}
```

- **Error (401)**: Unauthorized access.

```json
{
  "message": "Unauthorized user"
}
```

---

### **6. Get All Events**

Retrieve a list of all events.

**URL**: `/events`

**Method**: `GET`

**Headers**:

`Authorization`: `Bearer <AccessToken>`

**Response**:

- **Success (200)**:

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
    },
    {
      "id": "eventId2",
      "name": "Music Night",
      "location": "Arena",
      "startDate": "2025-02-10T20:00:00Z",
      "endDate": "2025-02-10T23:00:00Z",
      "category": ["music"]
    }
  ]
}
```

- **Error (500)**:

```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

### **7. Register Participant**

Register a participant for an event.

**URL**: `/participants`

**Method**: `POST`

**Headers**:

`Authorization`: `Bearer <AccessToken>`

`Content-Type`: `application/json`

**Request Body**:

```json
{
  "userId": "userId",
  "eventId": "eventId",
  "code": 12345
}
```

**Response**:

- **Success (201)**:

```json
{
  "message": "Participant registered successfully",
  "participant": {
    "id": "participantId",
    "userId": "userId",
    "eventId": "eventId",
    "code": 12345
  }
}
```

- **Error (400)**: Missing or invalid fields.

```json
{
  "message": "Validation failed",
  "error": "Missing required fields"
}
```

- **Error (409)**: Duplicate registration.

```json
{
  "message": "Participant already registered"
}
```

---

### **8. Get Participants by Event**

Retrieve the list of participants for a specific event. Only accessible by event organizers.

**URL**: `/participants?eventId=eventId`

**Method**: `GET`

**Headers**:

`Authorization`: `Bearer <AccessToken>`

**Response**:

- **Success (200)**:

```json
{
  "participants": [
    {
      "id": "participantId",
      "userId": "userId",
      "eventId": "eventId",
      "code": 12345
    }
  ]
}
```

- **Error (401)**: Unauthorized access.

```json
{
  "message": "Unauthorized access"
}
```

- **Error (500)**:

```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## **Error Handling**

All errors follow a consistent structure:

```json
{
  "message": "Error message",
  "error": "Detailed error information"
}
```


