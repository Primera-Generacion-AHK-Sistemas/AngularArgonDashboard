import { IBbands } from './../../interfaces/technicalAnalysis/Ibbands';
export class Bbands implements IBbands {
    lower: number;
    mid: number;
    upper: number;
    close: number;
    signal: number;

    constructor() {
        this.lower = 0;
        this.mid = 0;
        this.upper = 0;
        this.close = 0;
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
        }
    }
}
