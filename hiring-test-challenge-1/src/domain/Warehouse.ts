import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, VersionColumn, Generated
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import WarehouseEvent from './WarehouseEvent';

@Entity()
export default class Warehouse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => WarehouseEvent, (event) => event.warehouse, {
    })
    warehouseEvents: WarehouseEvent[];

    @VersionColumn()
    version: number;

    constructor(id?: string) {
      this.id = id;
    }
}
