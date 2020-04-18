import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';

import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  importFilename: string;
}
class ImportTransactionsService {
  async execute({ importFilename }: Request): Promise<Transaction[]> {

    const pathCsv = path.join(uploadConfig.directory, importFilename);

    const createTransaction = new CreateTransactionService();

    const promiseTransaction = await new Promise<Transaction[]>((resolve, reject) => {

      const arrayTransactions: Transaction[] = [];

      fs.createReadStream(pathCsv)
        .pipe(csvParse({ delimiter: ',', columns: true, trim: true }))
        .on('data', async data => {
          arrayTransactions.push(data);
        })
        .on('error', () => reject)
        .on('end', () => {
          resolve(arrayTransactions);
        });
    });

    const total = promiseTransaction;

    async function getTransactions(
      totals: Array<Record<string, any>>,
    ): Promise<Transaction[]> {
      
      const results: Transaction[] = [];

      for (const data of totals) {
        const transaction = await createTransaction.execute({
          title: data.title,
          type: data.type,
          value: data.value,
          category: data.category,
        });
        results.push(transaction);
      }

      return Promise.all(results);
    }

    const transactions = await getTransactions(total);

    return transactions;
  }
}

export default ImportTransactionsService;