import { IBankSummary } from "src/app/components/custom-aggregate-banks/custom-aggregate-banks.component";
import { Bank } from "src/app/models/bank.model";



export class SearchService {

  /** Contains all the registers from banks */
  private registerBanks: Bank[] = []
  /** */
  private registerFiltered: Bank[] = [];

  constructor() { }

  /**
    * Convert a string to an array of registers from bank
    * @param {string} data value of string that contains the registers
    * @returns {Bank[]} a array with the registers of all the banks
    */
  public loadData(data: string, registersLoad?: number): Bank[] {

    const bankCSV = data.split("\n");
    registersLoad = registersLoad ? registersLoad + 1 : bankCSV.length - 1;
    for (let index = 1; index < registersLoad; index++) {
      let row = bankCSV[index].split(",");
      this.registerBanks.push(new Bank(row))
    }
    this.sortDescending();
    return this.registerBanks
  }


  private sortDescending(): void {
    this.registerBanks.sort((a, b) => (a.dateTime > b.dateTime) ? -1 : 1);
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

  public filterByString(text: string): Bank[] {
    this.registerFiltered = []
    if (text !== undefined && text !== null) {
      this.registerFiltered = this.registerBanks.filter((register: Bank) => this.isInclude(register, text))
    }

    return this.registerFiltered;
  }

  private isInclude(register: any, text: string) {
    return Object.keys(register).some(key => {
      let isInclude = false;
      switch (typeof register[key]) {
        case 'string':
          isInclude = register[key].toLocaleLowerCase().includes(text.toLocaleLowerCase())
          break;
        case 'number':
          isInclude = register[key].toLocaleString().toLocaleLowerCase().includes(text.toLocaleLowerCase())
          break;
        case 'object':
          break;
        //TODO.. search by date?
        default:
          isInclude = false;
          break;
      }
      return isInclude;
    })
  }
}
