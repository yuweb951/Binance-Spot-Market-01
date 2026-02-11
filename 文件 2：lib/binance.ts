// lib/binance.ts
import { cache } from './cache';

const BINANCE_API = 'https://api.binance.com/api/v3';

export interface Ticker {
  symbol: string;
  price: string;
  priceChangePercent: string;
  volume: string;
  quoteVolume: string;
}

export interface TokenInfo {
  symbol: string;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
}

export interface MarketCapData {
  price: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  marketCap: number;
  fdv: number;
  circulationRate: number;
}

export async function get24hrTicker(symbol: string = 'BTCUSDT'): Promise<Ticker> {
  const res = await fetch(`${BINANCE_API}/ticker/24hr?symbol=${symbol}`);
  return res.json();
}

export async function getAllTickers(): Promise<Ticker[]> {
  const res = await fetch(`${BINANCE_API}/ticker/24hr`);
  return res.json();
}

export async function getKlines(
  symbol: string,
  interval: string = '1h',
  limit: number = 100
) {
  const res = await fetch(
    `${BINANCE_API}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
  );
  return res.json();
}

function symbolToCoinGeckoId(symbol: string): string {
  const mapping: Record<string, string> = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'BNB': 'binancecoin',
    'SOL': 'solana',
    'XRP': 'ripple',
    'ADA': 'cardano',
    'DOGE': 'dogecoin',
    'MATIC': 'matic-network',
    'DOT': 'polkadot',
    'AVAX': 'avalanche-2',
    'LINK': 'chainlink',
    'UNI': 'uniswap',
    'ATOM': 'cosmos',
    'LTC': 'litecoin',
  };
  return mapping[symbol.toUpperCase()] || symbol.toLowerCase();
}

export async function getTokenInfo(symbol: string): Promise<TokenInfo | null> {
  const cached = cache.get<TokenInfo>(`token_info_${symbol}`);
  if (cached) return cached;

  try {
    const coinId = symbolToCoinGeckoId(symbol.replace('USDT', ''));
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    
    if (!res.ok) return null;
    
    const data = await res.json();
    const tokenInfo: TokenInfo = {
      symbol: symbol,
      circulatingSupply: data.market_data?.circulating_supply || 0,
      totalSupply: data.market_data?.total_supply || 0,
      maxSupply: data.market_data?.max_supply || data.market_data?.total_supply || 0,
    };
