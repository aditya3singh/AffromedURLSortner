
# 🌐 Affromed URL Shortener Microservice & Web App

![Affromed Logo] <img width="1644" height="882" alt="image" src="https://github.com/user-attachments/assets/8dc8e9cc-cffc-4174-b720-c4a813b8c1fb" />


<img width="1821" height="922" alt="image" src="https://github.com/user-attachments/assets/7e09bc36-8478-427e-9f24-56a7f9da431c" />

<img width="1014" height="450" alt="image" src="https://github.com/user-attachments/assets/fb5d6d4e-8973-47bf-9e54-b22048bc925c" />


## ✨ Overview

This project is a full-stack URL Shortener application developed as part of the Affordmed Campus Hiring Evaluation. It includes:

- 🚀 **Microservice architecture** for shortening and managing URLs
- 📊 **Basic analytics** for shortened links (clicks, referrers, creation/expiry)
- ⚙️ **Logging middleware** for detailed request logs (custom built, no console logs)
- 🎨 **Responsive React frontend** styled with Material UI
- ✅ Robust error handling & validation
- ⏳ Default validity of 30 mins for links, with customizable shortcode & expiry

## 🏗️ Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Mongoose), dotenv
- **Frontend:** React.js, Material UI (MUI)
- **Database:** MongoDB Atlas
- **Logging:** Custom middleware (not console.log)
- **Version Control:** Git + GitHub

## 🔥 Features

✅ Shorten long URLs with optional custom shortcode & validity  
✅ Default link expiry after 30 minutes  
✅ Globally unique short links  
✅ Redirect to original URL via shortened link  
✅ Click tracking with timestamp, referrer, & location  
✅ REST API with clean JSON responses  
✅ Beautiful, responsive UI built with Material UI  
✅ No login/signup — all API access is pre-authorized

## 🚀 API Endpoints

### 1️⃣ Create Short URL
- **POST** `/shorturls`
```json
{
  "url": "https://example.com/long-url",
  "validity": 45,
  "shortcode": "mycode123"
}
```
- **Response:**
```json
{
  "shortLink": "http://localhost:5000/mycode123",
  "expiry": "2025-01-01T00:30:00Z"
}
```

### 2️⃣ Retrieve Short URL Stats
- **GET** `/shorturls/:shortcode`
- **Response:**
```json
{
  "originalUrl": "https://example.com",
  "createdAt": "2025-07-14T05:44:00Z",
  "expiresAt": "2025-07-14T06:14:00Z",
  "totalClicks": 5,
  "clicks": [
    {
      "timestamp": "2025-07-14T05:50:00Z",
      "referrer": "Direct",
      "location": "India"
    }
  ]
}
```

## 🖥️ Frontend Usage

- Runs on: `http://localhost:3000`
- Features:
  - Input up to **5 URLs at once** with optional custom shortcode & validity.
  - Displays short URL with expiry time after creation.
  - **Stats page** showing all created short URLs, click count, and detailed history.

## ⚙️ Setup Instructions

### Clone repo
```bash
git clone https://github.com/aditya3singh/AffromedURLSortner.git
cd AffromedURLSortner
```

### 🚀 Backend
```bash
cd backend
npm install
```
Create `.env`:
```
MONGO_URI=your_mongodb_uri
PORT=5000
```
Run server:
```bash
npm start
```

### 🌐 Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Runs on: `http://localhost:3000`

## ✍️ Logging

✅ Uses custom Logging middleware (no console.log).

## 📸 Screenshots

| 🔗 Shorten URLs | 📊 View Stats | 
<img width="1014" height="450" alt="image" src="https://github.com/user-attachments/assets/207e1450-694d-4eba-a57d-91a428daaf5e" />


## 🚀 Deployment
- Backend: Render/Railway/Heroku
- Frontend: Vercel/Netlify

## 👨‍💻 Author
- **Aditya Singh**
- [GitHub](https://github.com/aditya3singh)

## ⚖️ License
Confidential - developed for Affordmed hiring. Not for external production use.

---

🙌 Thanks for checking this out!

