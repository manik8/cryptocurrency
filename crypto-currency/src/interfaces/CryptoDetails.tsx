// src/interfaces/CryptoDetails.interfaces.ts

export interface CryptoDetail {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
  marketCapUsd: string;
  supply: string;
  maxSupply: string;
}

export interface HistoricalPrice {
  priceUsd: string;
  time: number;
}
