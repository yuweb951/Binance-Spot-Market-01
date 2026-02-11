'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getKlines } from '@/lib/binance';

export default function VolumeChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function loadKlines() {
      const klines = await getKlines(symbol, '1h', 24);
      const formatted = klines.map((k: any) => ({
        time: new Date(k[0]).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        price: parseFloat(k[4]),
      }));
      setData(formatted);
    }
    loadKlines();
  }, [symbol]);
