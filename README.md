# UTBS (Universal Ticket Booking System)

UTBS is a web-based application that provides a unified platform for booking tickets across different domains such as trains, movies, and concerts. The system is designed to handle multiple booking workflows under a single architecture while keeping the business logic modular and easy to extend.

The project focuses on backend design, data modeling, and clean API development, with a simple frontend to interact with the system.

---

## Features

- User authentication and authorization
- Unified ticket booking for trains, movies, and concerts
- Domain-specific booking logic handled through a common interface
- Seat and slot selection
- Booking history and status tracking
- Admin controls for managing events, schedules, and availability
- Basic validation and error handling

---

## Tech Stack

**Frontend**
- React
- Tailwind CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB with Mongoose

**Other Tools**
- JWT-based authentication
- Git and GitHub

---

## System Design Overview

The application follows a modular backend architecture. Each booking domain (train, movie, concert) has its own service layer while sharing common components such as authentication, users, and payments.

This approach allows new ticket types to be added with minimal changes to the existing system and keeps domain-specific complexity isolated.

---
