import { IBankSummary } from "src/app/components/custom-aggregate-banks/custom-aggregate-banks.component";
import { Bank } from "src/app/models/bank.model";



export class SearchService {

  /** Contains all the registers from banks */
  private registerBanks: Bank[] = []

  constructor() { }

  /**
    * Convert a string to an array of registers from bank
    * @param {string} data value of string that contains the registers
    * @returns {Bank[]} a array with the registers of all the banks
    */
  public loadData(data: string): Bank[] {

    const bankCSV = data.split("\n");
    for (let index = 1; index < bankCSV.length - 1; index++) {
      // for (let index = 1; index < 300 - 1; index++) {
      let row = bankCSV[index].split(",");
      this.registerBanks.push(new Bank(row))
    }

    return this.registerBanks;
  }


  /**
   * Returns a array that contains the registers of all the banks
   * @returns register of the banks
   */
  public getRegisterBanks(): Bank[] {
    return this.registerBanks;
  }

  public filterByCard(creditCardSelected: string): IBankSummary {
    let summaryCreditCard: IBankSummary = {};
    if (creditCardSelected !== undefined && creditCardSelected !== null && creditCardSelected.length > 0) {

      // this.loading = true

      // this.loading = false
      this.registerBanks.map(registerBank => {
        if (registerBank.creditCard === creditCardSelected) {
          if (!summaryCreditCard.hasOwnProperty(registerBank.name)) {
            summaryCreditCard[registerBank.name] = registerBank.totalPrice
          } else {
            summaryCreditCard[registerBank.name] += registerBank.totalPrice
          }
        }
      })
      return summaryCreditCard
    }
    return summaryCreditCard;
  }

}
