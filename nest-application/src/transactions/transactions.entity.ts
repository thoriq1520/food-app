import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customers } from '../customers/customers.entity';
import { Foods } from '../foods/foods.entity';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    transaction_id: number;

    @ManyToOne(() => Customers, (customer) => customer.customer_id, { nullable: false })
    @JoinColumn({ name: 'customer_id' }) // Specify the foreign key column name
    customer: Customers;

    @ManyToOne(() => Foods, (food) => food.food_id, { nullable: false })
    @JoinColumn({ name: 'food_id' }) // Specify the foreign key column name
    food: Foods;

    @Column({ type: 'int', nullable: false })
    qty: number;

    @Column({ type: 'int', nullable: true })
    total_price: number;

    @Column({ type: 'date', nullable: false })
    transaction_date: string;
}
