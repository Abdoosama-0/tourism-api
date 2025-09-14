## tourism api

A simple booking system API built with **Node.js**, **Express.js**, and **MongoDB**.  
This API allows users to create, view, update, and delete bookings for **hotels**, **activities**, or **events**. Admin users have full access, while regular users can only manage their own bookings.


## Features
- User roles: **admin** and **user**
- Bookings can be of type: `hotel`, `activity`, `event`
- Admins can view and manage all bookings
- Users can view and manage only their bookings
- Populate referenced data for `user` and `item`
- Track booking status: `pending`, `confirmed`, `cancelled` 


### 📊 Advanced Querying  
- **Filtering**:  
  Example → `/api/ideas?status=Concept`  

- **Sorting**:  
  Example → `/api/ideas?sort=title&order=asc`  

- **Pagination**:  
  Example → `/api/ideas?_limit=10&_page=1`  
---
## 🌐 Live API Test
You can try the API in real-time:  
👉 [Click here to test](https://tourism-api-production-aac8.up.railway.app)

## 📬 Postman Collection & API Documentation
Explore and test all API endpoints using the Postman Collection below:  
👉 [Postman Collection](https://goatme.postman.co/workspace/SocialNet-API~f41737ee-6515-4f7d-8266-fe9389bba116/collection/40780206-70ea1d27-d4a5-4e6e-bb2b-7c153d490985?action=share&source=copy-link&creator=40780206)  

**Note:** Make sure to use the link above as the **URL variable** in Postman to test all endpoints correctly.

---
## 🚀 How to Run the Project
Make sure you have **Node.js** installed on your machine.  

1. **Clone the repository**  
   ```bash
   git clone <repo-url>
   cd Project-Ideas-Manager-API
2. **Install dependencies**  
   ```bash
   npm install
3. **create .env**
   ```bash
   SECRET_KEY=your_secret_ket
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   EMAIL_PASS=your_email_password
   SECRET_KEY=your_secret_key
   
4. **Start the server**  
   ```bash
   npm run dev

## 💻 Tech Stack

- **Node.js** & **Express.js** for the backend
- **MongoDB** & **Mongoose** for database
- **JavaScript (ES6+)** → Core language used.
- **bcrypt** for password hashing
- **JWT** for authentication
- **Nodemailer** → For sending emails 
- **Postman** for testing
- **Git & GitHub** → For version control and collaboration.
- **dotenv** → For managing environment variables securely.  
