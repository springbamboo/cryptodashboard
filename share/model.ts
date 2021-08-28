// backendからfrontendへ渡されるデータ
export interface Coindata {
    exchange: string;
    pairName: string;
    price: number;
    quatity: number;
    change: number;
    funding: number;
    ratio: {
        long: number;
        short: number;
    };
}

export type CoindataObj = { [pairName: string]: Coindata}