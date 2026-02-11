return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp className="text-yellow-500" />
        市值指标
      </h3>

      <div className="space-y-4">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <Coins size={20} />
              <span>流通市值</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">{formatNumber(marketData.marketCap)}</div>
              <div className="text-sm text-gray-400">{formatSupply(marketData.circulatingSupply)} {symbol.replace('USDT', '')}</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <TrendingUp size={20} />
              <span>FDV (完全稀释)</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{formatNumber(marketData.fdv)}</div>
              <div className="text-sm text-gray-400">{formatSupply(marketData.maxSupply)} {symbol.replace('USDT', '')}</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <Percent size={20} />
              <span>流通率</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{marketData.circulationRate.toFixed(2)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
