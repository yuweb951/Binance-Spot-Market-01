'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';

export default function PriceCard({ ticker }: { ticker: any }) {
  const isPositive = parseFloat(ticker.priceChangePercent) >= 0;
  
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-400 text-lg">{ticker.symbol}</h2>
          <div className="text-5xl font-bold mt-2">
            ${parseFloat(ticker.price).toFixed(2)}
          </div>
        </div>
        
        <div className={`flex items-center gap-2 text-2xl font-bold ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? <ArrowUp size={32} /> : <ArrowDown size={32} />}
          {parseFloat(ticker.priceChangePercent).toFixed(2)}%
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div className="text-gray-400 text-sm">24h 交易量</div>
          <div className="text-xl font-semibold">
            {(parseFloat(ticker.volume) / 1000).toFixed(2)}K
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">24h 成交额</div>
          <div className="text-xl font-semibold">
            ${(parseFloat(ticker.quoteVolume) / 1e6).toFixed(2)}M
          </div>
        </div>
      </div>
    </div>
  );
}
