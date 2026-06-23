# Event Booking System

This project is a backend application for managing events and bookings. It provides APIs for users to view events, book tickets, and handle event-related functionalities.

## Getting Started

To get started with the Event Booking System, follow the instructions below.

### Prerequisites

- Node.js installed on your local machine
- MongoDB installed and running locally or accessible remotely

### Installation

1. Clone the repository:
   git clone <repository-url>

2. Navigate to the project directory:
  cd event-booking-system

3. Install dependencies:
  npm install

4. Set up environment variables:
  Create a .env file in the root directory.
  Add your MongoDB connection URI and jwtSecret to the .env file:
  mongooseURI=<your-mongodb-uri>
  jwtSecret=<your-seceret>

5. Run the application:
  npm start

6. Use Postman or any other API testing tool to interact with the available endpoints.


# API Endpoints

## Event endpont
- GET /event: Retrieve a list of all events.
- GET /event?_id : Retrieve details of a specific event by its ID.
- POST /event: Create a new event.

## Booking event
- POST /booking/:event_code: Book tickets for a specific event (Require authentication).
- GET /booking/my-booking: Fetch all bookings of user (Require authentication).

## Authetication
- POST /auth/register: Resgister a new user {email, password, username}
- POST /auth/login: Login user {email, password}












