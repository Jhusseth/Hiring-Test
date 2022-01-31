import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';

@Entity({ name: 'type' })
export default class Type {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text'
  })
  value: string;

  constructor(value: string, id?: string) {
    this.id = id;
    this.value = value;
  }
}
