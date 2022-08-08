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
      let row = bankCSV[index].split(",");

      this.registerBanks.push(new Bank(row))
      // this.aggregateCurrentBank(currentBank);
      // this.setCreditCard(currentBank);
    }
    // this.creditCardsReady = true;

    return this.registerBanks;
  }


  /**
   * Returns a array that contains the registers of all the banks
   * @returns register of the banks
   */
  public getRegisterBanks(): Bank[] {
    return this.registerBanks;
  }
}