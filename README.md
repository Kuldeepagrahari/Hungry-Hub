# 🍔 Food Ordering Application — Hungry Hub

A comprehensive **MERN stack** food ordering platform built for **speed**, **security**, and **personalization**.  
Hungry Hub goes beyond basic ordering by leveraging **Google Gemini AI** for personalized meal advice, ensuring a responsive user experience and robust administrative control.

---

## 🚀 Key Features

### ✨ Core Functionality & Personalization
- **AI Meal Advisor (Gemini Integration):**  
  Users receive personalized food suggestions and dietary warnings based on health, diet orientation (e.g., low-carb, high-protein), and occasion by querying the menu through an AI interface.
  <img width="1891" height="873" alt="image" src="https://github.com/user-attachments/assets/fefab78f-6cda-46f9-8524-c0eda83994d8" />

- **Unified Authentication:**  
  Secure sign-up/login via both **Google Sign-In** and a **two-step OTP verification** process.
  <img width="1908" height="908" alt="image" src="https://github.com/user-attachments/assets/0c463071-184d-4c06-876f-5403af8b3ced" />

- **Role-Based Access:**  
  Dynamically routes administrators to a dedicated, secure **Admin Panel URL** upon successful login.
- **Browse Meals:**  
  Explore a variety of menu items.
  <img width="1917" height="910" alt="image" src="https://github.com/user-attachments/assets/56f91ad9-98f8-46c1-9c8b-0eba9c08f210" />

- **Order Meals:**  
  Seamlessly add items to the cart and place orders.

---

### 🔒 Security & Operations
- **Secure Payments:**  
  Integrated with **Stripe** for reliable transaction processing.
- **Customer Care Portal:**  
  Users can submit queries, complaints, and feedback directly to the backend.
  <img width="1886" height="894" alt="image" src="https://github.com/user-attachments/assets/a72de974-642d-4ce1-b839-bcac0a31eb87" />

- **Secure Admin Panel:**  
  Admin routes and access points are secured via **JWT** and **role-based middleware** for comprehensive access control.
  <img width="1900" height="895" alt="image" src="https://github.com/user-attachments/assets/a269738f-fc24-4c27-8634-044fcece9d77" />


---

### 🖥️ Admin & Cloud Management
- **Order Management:**  
  Track and manage incoming orders efficiently.
- **Customer Support Management:**  
  View and update the status of customer support tickets via the Admin Panel.
- **Cloud Media Storage:**  
  Uses **ImageKit** for optimized image uploads and cloud storage, replacing unreliable local disk storage.
  <img width="1897" height="910" alt="image" src="https://github.com/user-attachments/assets/5486fb83-23f9-4f9c-8e1c-ecbe51875498" />


---

## 🧠 Tech Stack

### 🧩 Frontend
- **React.js** – Responsive and interactive UI.
- **@react-oauth/google** – Google Sign-In integration.

### ⚙️ Backend
- **Express.js / Node.js** – RESTful API and server runtime.
- **MongoDB / Mongoose** – NoSQL database for users, orders, and menu data.

### 🌐 Third-Party Integrations
- **Google Gemini API** – AI meal recommendations.
- **Stripe** – Secure payment processing.
- **ImageKit** – Cloud media management.
- **Nodemailer** – Email & OTP verification.
- **Socket.IO** – Real-time customer support.

---

## ⚡ Installation and Setup

<details>
<summary><strong>📦 Click to expand installation steps</strong></summary>
   
```bash
### 1️⃣ Clone the Repository
git clone https://github.com/Kuldeepagrahari/Hungry-Hub.git

2️⃣ Navigate to the Project Directory
cd hungry-hub
3️⃣ Install Dependencies
# Backend
npm install

# Frontend
cd client
npm install

4️⃣ Configure Environment Variables
🛠 Backend (.env)
PORT=5000
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
STRIPE_SECRET_KEY=<Your Stripe Secret Key>

# NODEMAILER / OTP
EMAIL_USER=<Your Sending Email Address>
EMAIL_PASS=<Your 16-Character App Password>

# GOOGLE AUTH / GEMINI
GOOGLE_CLIENT_ID=<Your Google OAuth Client ID>

# IMAGEKIT
IMAGEKIT_PUBLIC_KEY=<Your ImageKit Public Key>
IMAGEKIT_PRIVATE_KEY=<Your ImageKit Private Key>
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

🧩 Frontend (client/.env.local)
# VITE requires the prefix VITE_
VITE_GOOGLE_CLIENT_ID=<Your Google OAuth Client ID>

5️⃣ Run the Application
🔹 Backend
npm run dev

🔹 Frontend
cd client
npm run dev

```
Now open the app at 👉 http://localhost:5173

</details>
💡 Future Enhancements

   1.Integrate nutrition APIs for calorie & macro insights.

   2.Add AI-powered voice ordering.

   3.Enhance admin analytics dashboard with predictive insights.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Kuldeep Agrahari

