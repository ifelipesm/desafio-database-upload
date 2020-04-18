import AppError from '../errors/AppError';
import {getCustomRepository, getRepository} from 'typeorm';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request{
  title: string, 
  value:number, 
  type: string;
  category:string;
}

class CreateTransactionService {
  public async execute({title,value,type,category}:Request): Promise<Transaction> {
    
    const categories = getRepository(Category);
    const transactions = getCustomRepository(TransactionsRepository);
    
    const {total} = await transactions.getBalance();

      if (type === 'outcome' && value > total) {
      throw new AppError("Invalid Operation. Insufficient Funds!");
      }
    
      let findCategory = await categories.findOne({
        where:
        {
        title:category,
        }
      });

      if(!findCategory){
        findCategory = categories.create({
          title:category,
        });
        await categories.save(findCategory);
      }

      const transaction = transactions.create({
        title,
        value,
        type,
        category_id: findCategory.id,
      });
      
      await transactions.save(transaction);

      return transaction;

  }
}

export default CreateTransactionService;
