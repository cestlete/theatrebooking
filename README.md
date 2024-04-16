
# Theatre Booking System

# Link to the prod application
[Theatre Booking Frontend](https://theatrebooking-2.onrender.com)

[Theatre Booking Backend](https://theatrebooking.onrender.com)

[Swagger for Backend](https://theatrebooking.onrender.com/api-docs/)

## Github
https://github.com/cestlete/theatrebooking.git

## Overview
This project is a Theatre Booking Application developed using React and Node.js. The frontend is built with React, providing a dynamic and responsive user interface for booking theatre shows. The backend, developed with Node.js and Express, handles API requests, data processing, and interactions with a database.

## Project Structure
- `/frontend-app`: Contains all React code and assets necessary for the frontend application.
- `/backend`: Contains all Node.js code for the backend API.

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/cestlete/theatrebooking.git
cd theatrebooking
```

### 2. Environment Variables
Set up necessary environment variables in your application:

- Create a `.env` file in the `/backend` and `/frontend-app` directory.

### 3. Setting up Docker Compose
#### Install Docker Desktop
- Docker Desktop is available for both Windows and macOS. You can download the installer from the official Docker website:
  - [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

#### Use Docker Compose
Check Docker Compose installation:
```bash
docker-compose --version
```

Navigate to the theatrebooking directory:
```bash
cd /path/to/theatrebooking
```

Build and run the containers:
```bash
docker-compose build
docker-compose up
```
For detached mode, run:
```bash
docker-compose up -d
```

Access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`.

Stop the containers using:
```bash
docker-compose down
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Authors and Contributions

- **All Members** - UX Design: All team members collaborated on the user experience design.
- **Karl and Mengqi** - Backend Development: Responsible for building and maintaining the server-side logic, APIs, and database interactions.
- **Jyoti and Jasmine** - Frontend Development: Focused on developing the client-side interface, ensuring user-friendly interactions and responsiveness. Also involved in the integration of backend services with the frontend, facilitating seamless data exchange and dynamic content updates.
- **David** - Architecture: Oversaw the overall software architecture, ensuring the system is robust, scalable, and well-integrated.

| Student ID | Name |
|----------|----------|
| 22252910  | Karl Mulraney |
| 23250192  | Mengqi Hao   |
| 15324996  | David O’Callaghan |
| 23250985  | Jyoti Suvarna     |
| 18482194  | Wingyin Ha     |
