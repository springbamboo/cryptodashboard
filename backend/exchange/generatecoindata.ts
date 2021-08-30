import { Coindata } from "./cointype";

export function generateCoindata(pair: string, exchange: string): Coindata {
  return {
    exchange: exchange,
    pairName: pair,
    price: 0,
    quatity: 0,
    change: 0,
    funding: 0,
    ratio: {
      long: 0,
      short: 0,
    },
  };
}
