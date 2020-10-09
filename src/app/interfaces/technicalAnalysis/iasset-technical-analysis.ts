import { Adx } from 'src/app/classes/technicalAnalysis/adx';
import { Bbands } from 'src/app/classes/technicalAnalysis/bbands';
import { Stoch } from 'src/app/classes/technicalAnalysis/stoch';

export interface IAssetTechnicalAnalysis {
    stoch: Stoch;
    adx: Adx;
    bbands: Bbands;
}
