import { Column, Entity, PrimaryGeneratedColumn,JoinColumn, ManyToOne, } from 'typeorm';
import Type from './Type';

import Message from './Message';

@Entity({ name: 'word' })
export default class Word {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text'
    })
    text: string;

    @Column({
        type: 'boolean',
        name: 'valid'
    })
    valid: boolean;

    @Column({
        type: 'text',
        name: 'description'
    })
    description: string;

    @ManyToOne(() => Type, (type) => type.id, { nullable: false })
    @JoinColumn({
      name: 'type_id'
    })
    type: Type;

    @ManyToOne(() => Message, (message) => message.id, { nullable: false })
    @JoinColumn({
      name: 'message_id'
    })
    message: Message;

    constructor(text:string,description:string, type:Type, message:Message,id?:string,valid?:boolean) {
      this.id = id;
      this.text = text;
      this.valid = valid;
      this.description = description;
      this.type = type;
    }
}