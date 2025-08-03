import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
const API_BASE_URL = 'https://api.coingecko.com/api/v3';

// A simple in-memory cache object
const cache = new Map();
const CACHE_TTL = 60000; // 60 seconds

const coingecko = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-cg-demo-api-key': API_KEY,
  },
});

export const getTopCoins = async (page: number = 1, perPage: number = 50, order: string = 'market_cap_desc') => {
  const cacheKey = `/coins/markets?page=${page}&per_page=${perPage}&order=${order}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }

  try {
    const response = await coingecko.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: order,
        per_page: perPage,
        page: page,
        sparkline: true,
        price_change_percentage: '24h',
      },
    });
    // Store the new data in the cache with a timestamp
    cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
    return response.data;
  } catch (error) {
    console.error('Error fetching top coins:', error);
    return null;
  }
};

export const getCoinDetails = async (id: string) => {
  const cacheKey = `/coins/${id}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }
  
  try {
    const response = await coingecko.get(`/coins/${id}`, {
      params: {
        tickers: false,
        community_data: false,
        developer_data: false,
        sparkline: true,
      },
    });
    cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for coin ${id}:`, error);
    return null;
  }
};

export const getMarketChart = async (id: string, days: string) => {
  const cacheKey = `/coins/${id}/market_chart?days=${days}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }

  try {
    const response = await coingecko.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
      },
    });
    cache.set(cacheKey, { data: response.data.prices, timestamp: Date.now() });
    return response.data.prices;
  } catch (error) {
    console.error(`Error fetching market chart for coin ${id}:`, error);
    return null;
  }
};