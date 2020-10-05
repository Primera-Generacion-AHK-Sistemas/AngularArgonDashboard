import { IAssetDollarInfo } from './../interfaces/iasset-dollar-info';

export class AssetDollarInfo implements IAssetDollarInfo {
    cclDollar: number;
    dateUpdated: string;
    cedearPriceBA: number;
    stockPriceUSA: number;
    ratio: number;
    cedearDollar: number;
    diffRealPrice: number;

    constructor() {
        this.cclDollar = 0;
        this.dateUpdated = '';
        this.cedearPriceBA = 0;
        this.stockPriceUSA = 0;
        this.ratio = 0;
        this.cedearDollar = 0;
        this.diffRealPrice = 0;
    }

    cedearTotalPrice(): number {
        return this.cedearPriceBA * this.ratio;
    }

    diffRealPricePositive(): boolean {
        return this.diffRealPrice > 0;
    }
}
