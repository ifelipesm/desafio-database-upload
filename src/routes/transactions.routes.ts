import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository  =  getCustomRepository(TransactionsRepository);
  const transactions = transactionsRepository.find();
  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  try {

    const { title,value,type } = request.body;

    const createTransactionService = new CreateTransactionService();

    const transaction = await createTransactionService.execute({
      title,
      value,
      type,
    });
    
    return response.json(transaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
