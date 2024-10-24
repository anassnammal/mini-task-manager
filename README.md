# Personal Task Manager

## Overview

This project is a simple personal task manager that provides basic functionality for CRUD (Create, Read, Update, Delete) operations.

## Getting Started

To start the development server for testing, simply run the following script:

```bash
bash run_project.sh
```

## Project Structure

### Technologies Used

- **Next.js** for both the backend and frontend:
  - Backend: Powered by Next.js API Routes
  - Frontend: Implemented as a Single Page Application (SPA)
- **Prisma ORM** for database queries

### Code Style

In this project, I aimed to write maintainable and scalable code. After a peer suggested the Model-View-Controller (MVC) design pattern, I conducted some research to understand how Next.js handles server-side and client-side functionalities. Implementing MVC seemed like a natural fit for this project:

- **Model**: Prisma ORM handles the data layer.
- **View**: Next.js Client components manage the frontend.
- **Controller**: Next.js API Routes handle business logic.

To ensure modularity and clean separation of concerns, I also implemented:

- A **Singleton** to manage the Prisma Client instance.
- A **Prisma Service** to handle CRUD operations using Prisma.

## Recommendations

Feel free to:

- Clone the source code and experiment with it.
- Reach out if you'd like to discuss the code, share knowledge, or exchange tips and ideas.

