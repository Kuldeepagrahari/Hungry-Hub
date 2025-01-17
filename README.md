# Food Ordering Application
![image](https://github.com/user-attachments/assets/24f93d2c-d19a-450d-b2b5-0c546ff9edb3)

## Description
A responsive and user-friendly food ordering platform that allows users to browse meals, place orders, and make secure payments. The application features an admin dashboard for effective restaurant and order management, real-time customer support, and optimized UI/UX for an enhanced user experience.

---
![image](https://github.com/user-attachments/assets/2c3d1a70-6bab-4f82-85a5-be39a3591b60)

## Features

### User Features
- **Browse Meals**: Explore a variety of menu items.
- **Order Meals**: Seamlessly add items to the cart and place orders.
- **Secure Payments**: Integrated with Stripe for reliable transaction processing.
- **Real-Time Support**: Get instant assistance via a live chat system powered by Socket.IO.

### Admin Features
- **Manage Menu Items**: Add, update, or remove menu items.
- **Order Management**: Track and manage incoming orders efficiently.
- **Restaurant Registrations**: Approve or reject new restaurant registrations.

---

## Tech Stack

### Frontend
- **React.js**: For building a responsive and interactive user interface.

### Backend
- **Express.js**: RESTful API development for handling business logic.
- **Node.js**: Server-side runtime environment.

### Database
- **MongoDB**: NoSQL database for storing user, order, and restaurant data.

### Third-Party Integrations
- **Stripe**: For secure and efficient payment processing.
- **Cloudinary**: To manage image uploads and optimize storage for menu items.
- **Socket.IO**: Enables real-time customer support.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd food-ordering-app
   ```

3. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=<Your MongoDB Connection String>
     STRIPE_SECRET_KEY=<Your Stripe Secret Key>
     CLOUDINARY_NAME=<Your Cloudinary Cloud Name>
     CLOUDINARY_API_KEY=<Your Cloudinary API Key>
     CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
     ```

5. Run the application:
   ```bash
   npm run dev
   ```

6. Access the application at `localhost:5173`.

