export class Bank {
    private _total_price: number;
    private _name: string;
    private _credit_card: string;


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
        this._name = row[4];
        this._total_price = parseFloat(parseFloat(row[0]).toFixed(2)); // get only 2 decimals
        this._credit_card = row[3];
    }

    get name(): string {
        return this._name;
    }

    get totalPrice() {
        return this._total_price;
    }

    get creditCard(): string {
        return this._credit_card;
    }

}