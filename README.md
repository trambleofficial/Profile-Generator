# 🌐 NeuroGrid: Synthetic Identity Engine

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React%2019-61dafb.svg)
![Node](https://img.shields.io/badge/backend-Node.js-339933.svg)
![Tailwind](https://img.shields.io/badge/styling-Tailwind%20CSS-38b2ac.svg)

**NeuroGrid** is a high-performance, bulk fictional user profile generator designed for developers, testers, and world-builders. It generates rich, cyberpunk-themed synthetic identities with unique avatars, bios, and technical skillsets.

---

## ✨ Key Features

- 🚀 **Bulk Generation**: Generate up to 1,000 unique identities in a single request.
- 🎨 **Cyberpunk Aesthetic**: Modern, dark-themed UI built with Tailwind CSS and Lucide icons.
- 🧬 **Rich Data**: Every profile includes bio, skills, interests, personality traits, and social links.
- 🖼️ **Dynamic Avatars**: Automated avatar generation using the RoboHash API.
- 🔍 **Real-time Search & Sort**: Filter through thousands of generated identities instantly.
- 📂 **Multi-format Export**: Download your data in **JSON** or **CSV** formats for easy integration.
- ⚡ **Lightning Fast**: Built with a lightweight Node.js/Express backend and a reactive Vite frontend.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Cyberpunk-inspired custom UI components
- **API**: RESTful architecture with rate limiting and health checks

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
```bash
git clone https://github.com/trambleofficial/Profile-Generator.git
cd Profile-Generator
npm install
```

### 3. Run the Application
```bash
# Start both client and server in development mode
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```text
.
├── server/             # Express Backend
│   ├── routes/         # API Route definitions
│   ├── services/       # Profile generation logic
│   ├── utils/          # Synthetic data pools & generators
│   └── server.js       # Main entry point
├── src/                # React Frontend (Vite)
│   ├── App.jsx         # Main UI logic
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles & Tailwind
└── exports/            # Default directory for local data exports
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ⚡ by [Tramble Official](https://github.com/trambleofficial)
