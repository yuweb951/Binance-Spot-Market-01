cache.set(`token_info_${symbol}`, tokenInfo);
    return tokenInfo;
  } catch (error) {
    console.error('Failed to fetch token info:', error);
    return null;
  }
}

export function calculateMarketCap(price: number, tokenInfo: TokenInfo): MarketCapData {
  const marketCap = price * tokenInfo.circulatingSupply;
  const fdv = price * tokenInfo.maxSupply;
  const circulationRate = (tokenInfo.circulatingSupply / tokenInfo.maxSupply) * 100;
  
  return {
    price,
    circulatingSupply: tokenInfo.circulatingSupply,
    totalSupply: tokenInfo.totalSupply,
    maxSupply: tokenInfo.maxSupply,
    marketCap,
    fdv,
    circulationRate,
  };
}
