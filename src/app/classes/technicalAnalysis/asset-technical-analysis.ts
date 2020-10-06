import { IAssetTechnicalAnalysis } from './../../interfaces/technicalAnalysis/iasset-technical-analysis';
import { Adx } from './adx';
import { Bbands } from './bbands';
import { Stoch } from './stoch';

export class AssetTechnicalAnalysis implements IAssetTechnicalAnalysis {
    stoch: Stoch;
    adx: Adx;
    bbands: Bbands;

    constructor() {
        this.stoch = new Stoch();
        this.adx = new Adx();
        this.bbands = new Bbands();
    }
}
