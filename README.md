# 🍬 Sweet Shop Management System

A **Django REST API** for managing a sweet shop’s inventory with user authentication, purchase system, and admin controls.  
This project was built as part of an **AI Kata assignment**, showcasing human + AI (ChatGPT) collaboration in real-world software development.  

---

## ✨ Features

### Backend Features
- 🔑 **JWT Authentication** – Secure user registration and login
- 👨‍💼 **Admin Dashboard** – Add, update, delete, and manage sweets inventory
- 🛒 **Shopping System** – Browse sweets, add to cart, and purchase items
- 🔍 **Search & Filter** – Find sweets by name, category, or price
- 📦 **Inventory Management** – Automatic stock reduction on purchase
- 📊 **Order Management** – Track purchases and manage order history

### Frontend Features
- 🎨 **Modern UI** – Beautiful, responsive design with Bootstrap
- 🔐 **Authentication Flow** – Login, register, and protected routes
- 🏠 **Home Page** – Browse available sweets with search functionality
- 🛒 **Shopping Cart** – Add/remove items, quantity management
- 👤 **User Dashboard** – Personal profile and order history
- 📱 **Responsive Design** – Works perfectly on all devices

---

## 🛠 Tech Stack

### Backend
- **Python** 3.12
- **Django** 5.x
- **Django REST Framework**
- **MySQL + PyMySQL**
- **JWT Authentication (SimpleJWT)**
- **django-cors-headers**

### Frontend
- **React** 19.1.1
- **React Router DOM** – Client-side routing
- **Bootstrap** 5.3.8 – UI components and styling
- **Axios** – API communication
- **JWT Decode** – Token management
- **Framer Motion** – Animations

---

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 16+
- MySQL Server

### Backend Setup
1. **Navigate to backend directory**
   ```bash
   cd sweetshop-kata
   ```

2. **Create virtual environment and install dependencies**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # or
   source venv/bin/activate  # Linux/Mac
   pip install -r requirements.txt
   ```

3. **Database setup**
   ```sql
   CREATE DATABASE sweetshop_db;
   CREATE USER 'sweetuser'@'localhost' IDENTIFIED BY 'sweetpass';
   GRANT ALL PRIVILEGES ON sweetshop_db.* TO 'sweetuser'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Run migrations and create admin user**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

5. **Start Django server**
   ```bash
   python manage.py runserver
   ```
   Backend will be available at: `http://127.0.0.1:8000/`

### Frontend Setup
1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start React development server**
   ```bash
   npm start
   ```
   Frontend will be available at: `http://localhost:3000/`

---

## 🔑 API Endpoints

### Auth
- `POST /api/auth/register/` → Register new user  
- `POST /api/auth/login/` → Login & get JWT tokens  
- `POST /api/auth/token/refresh/` → Refresh access token  

### Sweets
- `GET /api/sweets/` → List sweets (Auth required)  
- `POST /api/sweets/` → Add sweet (Admin only)  
- `GET /api/sweets/{id}/` → Get sweet by ID  
- `PUT/PATCH /api/sweets/{id}/` → Update sweet (Admin only)  
- `DELETE /api/sweets/{id}/` → Delete sweet (Admin only)  
- `POST /api/sweets/{id}/purchase/` → Purchase sweet  
- `POST /api/sweets/{id}/restock/` → Restock sweet (Admin only)  

---

## 📱 Frontend Pages

- **Home (`/`)** – Browse sweets, search and filter
- **Login (`/login`)** – User authentication
- **Register (`/register`)** – User registration
- **Dashboard (`/dashboard`)** – User profile and admin controls
- **Cart (`/cart`)** – Shopping cart management

---

## 🖼 Screenshots

### 🏠 Home Page  
![Home Screenshot](images/home.png)

### 📝 Registration Page  
![Registration Screenshot](images/registration.png)

### 🔐 Login Page  
![Login Screenshot](images/login.png)

### 👤 Dashboard  
![Dashboard Screenshot](images/dashboard.png)

### 🛒 Cart Page  
![Cart Screenshot](images/cart.png)

### 📦 Placing Order  
![Placing Order Screenshot](images/placing_order.png)

## 💻 Development

### Running Both Servers
1. Start backend server: `python manage.py runserver` (Port 8000)
2. Start frontend server: `npm start` (Port 3000)
3. Both applications will run simultaneously

### Project Structure
```
sweetshop-kata/
├── sweetshop/          # Django project settings
├── sweets/             # Sweets app (models, views, APIs)
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── api/        # API configuration
└── requirements.txt    # Python dependencies
```

---

## 📊 Example Usage

### Register
```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/   -H "Content-Type: application/json"   -d '{"username":"user1","email":"u1@mail.com","password":"pass123"}'
```

### Login
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/   -H "Content-Type: application/json"   -d '{"username":"user1","password":"pass123"}'
```

### Purchase Sweet
```bash
curl -X POST http://127.0.0.1:8000/api/sweets/1/purchase/   -H "Authorization: Bearer <ACCESS_TOKEN>"   -H "Content-Type: application/json"   -d '{"quantity": 2}'
```

---

## 🤝 Contributing

This project showcases the collaboration between human developers and AI assistants in building real-world applications. Each feature and improvement demonstrates the power of human-AI partnership in software development.

---

## 📄 License

This project is open source and available under the MIT License.
