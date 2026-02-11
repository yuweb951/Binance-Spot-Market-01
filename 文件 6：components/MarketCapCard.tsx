'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Coins, Percent } from 'lucide-react';
import { getTokenInfo, calculateMarketCap, type MarketCapData } from '@/lib/binance';

interface Props {
  symbol: string;
  price: number;
}

export default function MarketCapCard({ symbol, price }: Props) {
  const [marketData, setMarketData] = useState<MarketCapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMarketData() {
      setLoading(true);
      const tokenInfo = await getTokenInfo(symbol);
      if (tokenInfo) {
        const data = calculateMarketCap(price, tokenInfo);
        setMarketData(data);
      }
      setLoading(false);
    }
    loadMarketData();
  }, [symbol, price]);

  if (loading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!marketData) {
    return <div className="bg-gray-800 p-6 rounded-lg"><p className="text-gray-400">暂无市值数据</p></div>;
  }

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  const formatSupply = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toFixed(0);
  };
