import {
  Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import Word from './Word';

@Entity({ name: 'message' })
export default class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Generated()
    @Column({
      type: 'timestamp',
      name: 'created_at'
    })
    createdAt: Date;

    @Column({
      type: 'boolean',
      name: 'has_been_processed'
    })
    hasBeenProcessed: boolean;

    @Column({
      type: 'text',
      name: 'valid'
    })
    valid: boolean;

    @Column({
      type: 'text',
      name: 'leader'
    })
    leader: string;

    @OneToMany(() => Word, (event) => event.message, {
    })
    words: Word[];

    constructor() {
    }
}
