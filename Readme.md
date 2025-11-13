# TODO LIST  - INTELLISQR ASSIGNMENT
##  I have made this Full Stack ToDo List as IntelliSQR FullStack Assignment
A Lightweight ToDo List with Minimalistic UI

#### Tech Stacks Used
### Frontend: 
- React
- TypeScript
- zod
- zustand
- React Query Hooks
- React Hook Form
- Tailwind CSS

### Backend: 
- TypeScript
- Express
- Node
- zod
- bcrypt
- cookie-parser
- cors
- crypto
- jsonwebtoken
- morgan
- mongoose
- MongoDB for Database

### New Tech Learned Via This Project
- zod
- zustand
- react query hook

### Assumptions made during development:
- #### Authentication and authorization
    - user must be logged-in to use todo related routes
    - JWT is stored in HTTP-Only cookie 
    - every request sends cookie automatically 

- #### USer Data
    - A user can only access their own todos
    - `req.user.id` always exists after successful login for ease of use

- #### Reset Password
    - Actual email based Reset and verification is not implemented, instead API returns a reset link for demonstration and testing purpose
    - The reset link is automatically copied, but a manual copy option is provided in case of uncertain events
    - Token is expired based on the ttl provided by the backend

- #### Frontend assumptions
    - The UI is intentionally minimal as the focus is backend logic + Main funtionality 
    - The app is to be tested on modern browsers like Chrome or Brave

- #### Security
    - Password hashing, JWT token signing, and authentication are assumed secure under the given setup.
    - CORS is configured assuming frontend and backend run on different ports (localhost).

- #### Dev Env
    - Assignment is Built using:
        - Node.js (backend)
        - React + Vite (frontend)
        - TailwindCSS (styling)
        - Zustand (auth store)
        - React Query (data fetching)
        - Zod + React Hook Form (validation)

- #### These assumptions were made to simplify the assignment and focus on core functionality rather than production-level features like UI polish or email delivery.

### For .env
- #### Backend
```
PORT= port
MONGODB_URI=mongo-uri
CLIENT_URL=client-url
JWT_SECRET=jwt-secret
```

### By Aman Pandey