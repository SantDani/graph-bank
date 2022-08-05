export class Bank {
    private total_price: number;
    private bank: string;


    constructor(bank: string, total_price: number) {
        this.bank = bank;
        this.total_price = total_price;
    }

    public getName(): string {
        return this.bank;
    }

    public getTotalPrice() {
        return this.total_price;
    }

}