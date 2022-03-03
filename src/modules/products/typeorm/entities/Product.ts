import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column('time with time zone')
  created_at: Date;

  @Column('time with time zone')
  updated_at: Date;
}

export default Product;
