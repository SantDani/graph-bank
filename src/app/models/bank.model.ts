interface IBank {
    totalPrice: number;
    numberItems: number;
    dateTime: Date;
    creditCard: string;
    name: string;
    retailType: string;
    retailCategory: string;
    country: string;
}

export class Bank implements IBank {
    private _totalPrice: number;
    private _name: string;
    private _creditCard: string;
    private _numberItems: number;
    private _dateTime: Date;
    private _retailType: string;
    private _retailCategory: string;
    private _country: string;


    /**    
        Structure rows:
        1 - total_price
        2 - number_of_items
        3 - datetime
        4 - credit_card
        5 - bank
        6 - retail_type
        7 - retail_category
        8 - country 
    */
    constructor(row: string[]) {
        this._totalPrice = parseFloat(parseFloat(row[0]).toFixed(2)); // get only 2 decimals
        this._numberItems = parseInt(row[1]);
        this._dateTime = new Date(row[2]);
        this._creditCard = row[3];
        this._name = row[4];
        this._retailType = row[5];
        this._retailCategory = row[6];
        this._country = row[7];
    }

    public getDateFriendly(): string {
        return `${this.dateTime.getUTCDate()} / ${this.dateTime.getUTCMonth() + 1} / ${this.dateTime.getUTCFullYear()}`
    }

    public get totalPrice(): number {
        return this._totalPrice;
    }
    public set totalPrice(value: number) {
        this._totalPrice = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get country(): string {
        return this._country;
    }
    public set country(value: string) {
        this._country = value;
    }
    public get creditCard(): string {
        return this._creditCard;
    }
    public set creditCard(value: string) {
        this._creditCard = value;
    }

    public get numberItems(): number {
        return this._numberItems;
    }
    public set numberItems(value: number) {
        this._numberItems = value;
    }

    public get dateTime(): Date {
        return this._dateTime;
    }
    public set dateTime(value: Date) {
        this._dateTime = value;
    }

    public get retailType(): string {
        return this._retailType;
    }
    public set retailType(value: string) {
        this._retailType = value;
    }

    public get retailCategory(): string {
        return this._retailCategory;
    }
    public set retailCategory(value: string) {
        this._retailCategory = value;
    }

}