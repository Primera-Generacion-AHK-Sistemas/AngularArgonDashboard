import { Cedear } from './cedear';

export class CedearBuilder {
    private fields: Map<string, string>;

    private constructor() {
        this.fields = new Map();
    }

    static instance() {
        return new CedearBuilder();
    }

    withId(id: number) {
        this.fields.set('id', id.toString());
        return this;
    }

    withAssetType(assetType: string) {
        this.fields.set('assetType', assetType);
        return this;
    }

    withTicker(ticker: string) {
        this.fields.set('ticker', ticker);
        return this;
    }

    withDescription(description: string) {
        this.fields.set('description', description);
        return this;
    }

    private valueFor(key: string) {
        return this.fields.has(key) ? this.fields.get(key) : null;
    }

    build() {
        const cedear: Cedear = {
            // tslint:disable-next-line: radix
            id: parseInt(this.valueFor('id')),
            assetType: this.valueFor('assetType'),
            ticker: this.valueFor('ticker'),
            description: this.valueFor('description'),
        };
        return cedear;
    }
}
