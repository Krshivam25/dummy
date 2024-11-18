const COINGECKO_TRENDING_API = 'https://api.coingecko.com/api/v3/search/trending';

export async function fetchTrendingCoins() {
  try {
    const response = await fetch(COINGECKO_TRENDING_API);
    if (!response.ok) {
      throw new Error('Failed to fetch trending coins');
    }
    const data = await response.json();
    return data.coins.map((coin: any) => ({
      id: coin.item.id,
      name: coin.item.name,
      symbol: coin.item.symbol,
      marketCapRank: coin.item.market_cap_rank,
      thumb: coin.item.large,
      priceBtc: coin.item.price_btc,
      price: coin.item.data?.price || 0,
      priceChange24h: coin.item.data?.price_change_percentage_24h?.usd || 0,
      marketCap: coin.item.data?.market_cap || 'N/A',
    }));
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    return [];
  }
}
