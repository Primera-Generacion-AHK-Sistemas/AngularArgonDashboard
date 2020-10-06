import { IAdx } from './../../interfaces/technicalAnalysis/Iadx';
export class Adx implements IAdx {
    adx: number;
    di_minus: number;
    di_plus: number;
    signal: number;

    constructor() {
        this.adx = 0;
        this.di_minus = 0;
        this.di_plus = 0;
        this.signal = 0;
    }

    signalValue(): number {
        switch (this.signal) {
            case -1: {
                return -1;
            }
            case 0: {
                return 0;
            }
            case 1: {
                return 1;
            }
            default: {
                return 2;
            }
        }
    }
}
