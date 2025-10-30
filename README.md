

## 📌 BookIt — Experiences & Slot Booking Platform

BookIt is a full-stack web application where users can explore travel experiences, check available slots, apply promo codes, and book their experience.
This project demonstrates **modern full-stack development** with clean UI design, real-world booking logic, and secure server interaction.

---

## 🚀 Tech Stack

### Frontend

* **Next.js / React + TypeScript**
* **TailwindCSS**
* Axios 
* React Hooks & Navigation

### Backend

* **Node.js + Express**
* **MongoDB**
* Mongoose / Prisma / Sequelize (based on DB)

---

## 📂 Features

- ✅ Browse experiences
- ✅ View experience details & available slots
- ✅ Select date, time, and quantity
- ✅ Apply promo code (SAVE10 / FLAT100)
- ✅ Checkout with user info
- ✅ Store booking details
- ✅ Booking success page
- ✅ Form validation
- ✅ Mobile-friendly UI

---

## 📁 Folder Structure

```
hde_assessment/
 ├── backend/         # Frontend (Next.js/React)
 └── frontend/        # Backend (Node/Express API)
```

---

## 🛠️ Setup Instructions

### ✅ **1. Clone Repository**

```bash
git clone https://github.com/NandishM0618/hde_assessment.git
cd hde_assessment
```

---

### ✅ **2. Setup Server (Backend)**

```bash
npm install
```

#### Create `.env` File

```
PORT=8080
MONGO_URI=mongodb://localhost:27017/bookit
```

#### Run Backend

```bash
npm run dev
```

Server runs at:
👉 [http://localhost:8080](http://localhost:8080)

---

### ✅ **3. Setup Frontend (Client)**

```bash
cd src/frontend
npm install
```

#### Create `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

#### Run Frontend

```bash
npm run dev
```

App runs at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| GET    | `/experiences`     | Get all experiences           |
| GET    | `/experiences/:id` | Get single experience + slots |
| POST   | `/bookings`        | Create a booking              |
| POST   | `/promo/validate`  | Validate promo code           |

### ✅ Promo Codes Supported

| Code    | Type    | Value |
| ------- | ------- | ----- |
| SAVE10  | percent | 10%   |
| FLAT100 | flat    | ₹100  |

---

## 🎯 Full Booking Flow

- 1️⃣ User selects an experience on Home
- 2️⃣ Views details & picks date, time & quantity
- 3️⃣ Goes to Checkout
- 4️⃣ Enters name, email & promo code
- 5️⃣ Booking saved in DB
- 6️⃣ Redirect to success page ✅

---

## 📷 UI Highlights

- ✔ Matches Figma Design
- ✔ Clean spacing & typography
- ✔ Responsive — Mobile + Desktop

---

## ✅ Validation

| Field       | Rule                   |
| ----------- | ---------------------- |
| Name        | Required               |
| Email       | Valid email            |
| Date / Time | Required               |
| Slot        | Prevent double booking |

---

## 🏁 Conclusion

This project demonstrates:

- ⭐ Full-stack application flow
- ⭐ Clean, scalable codebase
- ⭐ Real-world booking system logic
- ⭐ UI/UX polish & responsiveness

---

## Author
- Nandish M
