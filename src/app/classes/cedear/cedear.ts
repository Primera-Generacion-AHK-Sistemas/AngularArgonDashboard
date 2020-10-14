import { ICedear } from './../../interfaces/cedear/Icedear';
export class Cedear implements ICedear {
    assetType: string;
    description: string;
    id: number;
    ticker: string;

    constructor() {
        this.assetType = '';
        this.description = '';
        this.id = 0;
        this.ticker = '';
    }
}
