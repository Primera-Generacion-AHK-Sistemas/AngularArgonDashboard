import { IStoch } from '../../interfaces/technicalAnalysis/Istoch';
export class Stoch implements IStoch {
    slowk: number;
    slowd: number;
    signal: number;

    constructor() {
        this.slowk = 0;
        this.slowd = 0;
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
