import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
   
const transactions = await this.find(); 

      const income = transactions
      .map(transaction=>transaction.type==='income'?transaction.value:0,)
      .reduce((accumulated,current)=>accumulated+current,0);

      const outcome = transactions
     .map(transaction=>transaction.type==='outcome'?transaction.value:0,)
     .reduce((accumulated,current)=>accumulated+current,0);
    

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }
}

export default TransactionsRepository;
