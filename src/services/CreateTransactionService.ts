// import AppError from '../errors/AppError';
import {getCustomRepository} from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';


interface Request{
  title: string, 
  value:number, 
  type: string;
}

class CreateTransactionService {
  public async execute({title,value,type}:Request): Promise<Transaction> {
    
    const transactions = getCustomRepository(TransactionsRepository);
    
    const balance = await transactions.getBalance();
  
      if (type === 'outcome' && value > balance.total) 
      throw Error ('Insufficient Funds');
      
      const transaction = transactions.create({
        title,
        value,
        type,
      });
      await transactions.save(transaction);

      return transaction;

  }
}

export default CreateTransactionService;
