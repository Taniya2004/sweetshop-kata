# 🍬 Sweet Shop Management System (AI Kata)

A **Django REST API** for managing a sweet shop’s inventory with user authentication, purchase system, and admin controls.  
This project was built as part of an **AI Kata assignment**, showcasing human + AI (ChatGPT) collaboration in real-world software development.  

---

## ✨ Features
- 🔑 **User Authentication (JWT)** – Register & login  
- 👨‍🍳 **Admin Controls** – Add, update, delete sweets  
- 🛒 **User Actions** – Browse sweets & purchase items  
- 🔎 **Search & Filter** – Find sweets by name/category  
- 📉 **Stock Management** – Quantity reduces on purchase, admin can restock  
- 📜 **Audit Ready** – Each commit co-authored with AI (ChatGPT)  

---

## 🛠 Tech Stack
- **Python** 3.12  
- **Django** 5.x  
- **Django REST Framework**  
- **MySQL + PyMySQL**  
- **JWT Authentication (SimpleJWT)**  
- **django-filters** for search  

---

## 🚀 Setup Instructions

### Prerequisites
- Python 3.12+  
- MySQL Server running locally  

### Steps
1. **Clone repo & enter folder**  
   ```bash
   git clone <repo-url>
   cd sweetshop-kata
   ```

2. **Create venv & install dependencies**  
   ```bash
   python -m venv venv
   venv\Scripts\activate     # Windows
   # or
   source venv/bin/activate  # Linux/Mac
   pip install -r requirements.txt
   ```

3. **Database setup (MySQL)**  
   ```sql
   CREATE DATABASE sweetshop_db;
   CREATE USER 'sweetuser'@'localhost' IDENTIFIED BY 'sweetpass';
   GRANT ALL PRIVILEGES ON sweetshop_db.* TO 'sweetuser'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Run migrations & create admin**  
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

5. **Start server**  
   ```bash
   python manage.py runserver
   ```
   Open → `http://127.0.0.1:8000/`

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