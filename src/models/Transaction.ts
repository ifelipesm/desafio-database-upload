import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column('varchar')
  title: string;
  
  @Column('varchar')
  type: string;
  
  @Column('integer')
  value: number;
  
  @Column('uuid')
  category_id: string;
  
  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  updated_at: Date;
}

export default Transaction;
