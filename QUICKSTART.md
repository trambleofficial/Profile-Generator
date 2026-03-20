# ⚡ Quick Start Guide

Welcome to **NeuroGrid**! Follow these steps to get your synthetic identity engine up and running in less than 2 minutes.

## 📥 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/trambleofficial/Profile-Generator.git

# Navigate into the project
cd Profile-Generator

# Install dependencies
npm install
```

## 🛠️ 2. Configuration (Optional)

Create a `.env` file in the root directory if you want to customize the port:

```env
PORT=3000
```

## 🚀 3. Launch Development Mode

Start both the backend server and the frontend client simultaneously using `concurrently`:

```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`

## 🧪 4. Verify API

Open your browser or use `curl` to check if the backend is alive:

```bash
curl http://localhost:3000/api/health
```

## 📦 5. Production Build

To build the project for production:

```bash
npm run build
npm start
```

## 📖 API Usage

### Generate Profiles
`GET /api/profiles?count=10`

**Parameters:**
- `count` (optional): Number of profiles (1-1000). Default is 1.

**Example Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "...",
      "username": "cyber_zen",
      "display_name": "Zen Vortex",
      "email": "cyber_zen@neurogrid.ai",
      ...
    }
  ]
}
```
