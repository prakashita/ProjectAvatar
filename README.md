# AI Avatar Studio

AI Avatar Studio is a web application that allows users to capture a selfie and transform it into a unique AI-generated avatar using Google's Gemini AI.

## 🚀 Features
- 📸 Capture selfies using a webcam.
- 🧠 Generate AI-powered avatars based on the captured image.
- ⚡ Fast and seamless image processing.
- 🎨 High-quality Pixar-style avatars with smooth shading and a polished look.
- 🌐 Modern UI with TailwindCSS and smooth animations.

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS, Webcam.js
- **Backend:** Node.js, Express, Multer
- **AI Model:** Google Gemini API

---

## 📂 Project Structure
```
AI-Avatar-Studio/
│── backend/                # Express Server
│   ├── uploads/            # Stores uploaded & processed images
│   ├── server.js           # Main backend logic
│── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React Components
│   │   ├── App.js          # Main Application
│   │   ├── index.js        # React Entry Point
│── .env                    # API Keys & Configuration
│── README.md               # Project Documentation
```

---

## 🔧 Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/prakashita/AI-Avatar-Studio.git
cd AI-Avatar-Studio
```

### 2️⃣ Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the `backend/` folder and add:
```
GEMINI_API_KEY=your_google_api_key
```

### 4️⃣ Start the Server
```sh
cd backend
node server.js
```

### 5️⃣ Start the Frontend
```sh
cd frontend
npm start
```

---

## 🚀 How to Use
1️⃣ Open `http://localhost:3000` in your browser.  
2️⃣ Capture an image using the **webcam button**.  
3️⃣ Wait for the AI to generate your **unique avatar**.  
4️⃣ View & download your AI-generated avatar.  

---

## 🛠️ API Endpoints
### 📤 Upload Image & Generate Avatar
**Endpoint:** `POST /upload`
- **Description:** Accepts an image and generates an AI avatar.
- **Response:** `{ success: true, avatarUrl: "http://localhost:5000/uploads/output.png" }`

### 📥 Fetch Latest Avatar
**Endpoint:** `GET /avatar`
- **Description:** Returns the most recently generated avatar.
- **Response:** `{ avatarUrl: "http://localhost:5000/uploads/output.png" }`

---

## 📌 Improvements & Future Updates
- 🎭 Support for multiple avatar styles (cartoon, anime, etc.).
- 💾 Save & download avatars easily.
- 📱 Mobile compatibility.
- 🔗 Cloud storage integration.

---

## 🤝 Contributing
Pull requests are welcome! If you find a bug or have suggestions, feel free to open an issue.

---

## 📜 License
This project is licensed under the MIT License.

---

### ✨ Made with ❤️ by Prakashita Singh.

