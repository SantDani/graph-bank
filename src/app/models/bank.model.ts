export class Bank {
    private total_price: number;
    private bank: string;
    private credit_card: string;


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
        this.bank = row[4];
        this.total_price = parseInt(row[0], 10);
        this.credit_card = row[3];
    }

    public getName(): string {
        return this.bank;
    }

    public getTotalPrice() {
        return this.total_price;
    }

    public getCreditCard() {
        return this.credit_card;
    }

}