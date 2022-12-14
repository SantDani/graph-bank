import { sum } from "d3";
import { IBankSummary } from "src/app/components/custom-aggregate-banks/custom-aggregate-banks.component";
import { Bank } from "src/app/models/bank.model";



export class SearchService {

  /** Contains all the registers from banks */
  private registerBanks: Bank[] = []
  /** */
  private registerFiltered: Bank[] = [];

  private totalMatch: number = 0;
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
    this.registerBanks = this.sortDescending(this.registerBanks);
    this.totalMatch = this.registerBanks.length;
    return this.registerBanks;
  }


  private sortDescending(registers: Bank[]): Bank[] {
    return registers.sort((a, b) => (a.dateTime > b.dateTime) ? -1 : 1);
  }
  /**
   * Returns a array that contains the registers of all the banks
   * @returns register of the banks
   */
  public getRegisterBanks(): Bank[] {
    return this.registerBanks;
  }


  public getRegisterFiltered(): Bank[] {
    return this.registerFiltered;
  }

  public filterByCard(creditCardSelected: string): IBankSummary {
    let summaryCreditCard: IBankSummary = { totalRegisters: 0 };
    this.registerFiltered = [];

    if (creditCardSelected !== undefined && creditCardSelected !== null && creditCardSelected.length > 0) {

      summaryCreditCard = this.aggregateRegisters(this.registerBanks, creditCardSelected)
      // this.registerBanks.map(registerBank => {
      //   if (registerBank.creditCard === creditCardSelected) {
      //     if (!summaryCreditCard.hasOwnProperty(registerBank.name)) {
      //       summaryCreditCard[registerBank.name] = registerBank.totalPrice
      //     } else {
      //       summaryCreditCard[registerBank.name] += registerBank.totalPrice
      //     }
      //     totalAggregate++;
      //     this.registerFiltered.push(registerBank)
      //   }

      // })
      // this.totalMatch = summaryCreditCard.totalRegisters
      return summaryCreditCard;
    }

    // this.totalMatch = summaryCreditCard.totalRegisters;
    return summaryCreditCard;
  }

  public aggregateRegisters(registers: Bank[], creditCardSelected: string): IBankSummary {
    let summaryCreditCard: IBankSummary = { totalRegisters: 0 };
    let totalAggregate: number = 0;
    registers.map(registerBank => {
      if (registerBank.creditCard === creditCardSelected) {
        if (!summaryCreditCard.hasOwnProperty(registerBank.name)) {
          summaryCreditCard[registerBank.name] = registerBank.totalPrice
        } else {
          summaryCreditCard[registerBank.name] += registerBank.totalPrice
        }
        totalAggregate++;
        this.registerFiltered.push(registerBank)
      }
    })
    // summaryCreditCard.totalRegisters = totalAggregate;
    return summaryCreditCard;
  }

  public getSummaryGraph(): IBankSummary {
    let summaryCreditCard: IBankSummary = { totalRegisters: 0 };
    let totalAggregate: number = 0;
    this.registerFiltered.map(registerBank => {

      if (!summaryCreditCard.hasOwnProperty(registerBank.name)) {
        summaryCreditCard[registerBank.name] = registerBank.totalPrice
      } else {
        summaryCreditCard[registerBank.name] += registerBank.totalPrice
      }
      totalAggregate++;
    })

    return summaryCreditCard;
  }


  public filterByString(text: string): Bank[] {
    this.registerFiltered = []
    if (text !== undefined && text !== null) {
      this.registerFiltered = this.registerBanks.filter((register: Bank) => this.isInclude(register, text))
    }
    this.totalMatch = this.registerFiltered.length;
    return this.registerFiltered;
  }

  private isInclude(register: any, text: string): boolean {
    text = this.removeDiacritic(text).toLocaleLowerCase().trim();
    return Object.keys(register).some(key => {
      let isInclude = false;
      switch (typeof register[key]) {
        case 'string':
          const currentValue = this.removeDiacritic(register[key]).toLocaleLowerCase();
          isInclude = currentValue.includes(text)
          break;
        case 'number':
          isInclude = register[key].toString().toLocaleLowerCase().includes(text)
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

  private removeDiacritic(value: string): string {
    return value.trim().normalize("NFD").replace(/\p{Diacritic}/gu, "")
  }

  public getTotalMatch(): number {
    return this.totalMatch;
  }
}
