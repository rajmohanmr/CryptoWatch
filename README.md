# CryptoWatch

**Live Cryptocurrency Data & Analytics**

This project is a simple but sleek dashboard that provides real-time cryptocurrency data from the CoinGecko API. It allows users to browse, search, and track their favorite cryptocurrencies in a clean, responsive interface.

---

## 📑 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API](#api)
- [Deployment](#deployment)

---

## 🚀 Features

- **Live Markets List**: A paginated table of the top cryptocurrencies, showing real-time price, 24h change, market cap, and volume.
- **Search & Filtering**: Users can search for cryptocurrencies by name or symbol and filter the list based on market cap, volume, or price.
- **Interactive Charts**: Clicking on a coin opens a detailed view with a responsive price chart and selectable time ranges (24h, 7d, 30d, 90d).
- **Watchlist**: A persistent, client-side watchlist that allows users to save and track their favorite coins.
- **Responsive Design**: The layout is optimized for a seamless experience on both desktop and mobile devices.
- **Loading States**: Features elegant loading skeletons and clear empty/error states for a smooth user experience.

---

## 🛠 Technologies Used

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charting**: Recharts
- **Data Fetching**: Axios
- **Deployment**: Vercel

---

## 🧑‍💻 Getting Started

Follow these steps to get the project up and running on your local machine.

### ✅ Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### 🔧 1. Clone the repository

```bash
git clone https://github.com/rajmohanmr/CryptoWatch
cd CryptoWatch
```

### 📦 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 🔐 3. Set up the CoinGecko API Key

1. Create a free account on the [CoinGecko Developer Dashboard](https://coingecko.com/en/api/documentation).
2. Generate a **Free Demo API Key**.
3. In the project root, create a file named `.env.local` and add:

```env
NEXT_PUBLIC_COINGECKO_API_KEY=YOUR_API_KEY_HERE
```

_(This file is included in `.gitignore` to keep your key secure.)_

### ▶️ 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📡 API

This project uses the [CoinGecko API v3](https://www.coingecko.com/en/api/documentation). Key endpoints include:

- `/coins/markets` – for the main markets list and global stats.
- `/coins/[id]` – for detailed coin information.
- `/coins/[id]/market_chart` – for historical price data for charts.

A simple caching layer is implemented to avoid hitting rate limits on the free plan.

---

## ☁️ Deployment

This project is easily deployable using [Vercel](https://vercel.com/), the official platform for Next.js apps.

---

