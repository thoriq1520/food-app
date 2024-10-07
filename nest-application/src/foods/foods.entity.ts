import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('foods')
export class Foods {
    @PrimaryGeneratedColumn()
    food_id: number;

    @Column({ type: 'varchar', nullable: false })
    food_name: string;

    @Column({ type: 'int', nullable: false })
    price: number;

    @Column({ type: 'int', nullable: false })
    stock: number;
}
