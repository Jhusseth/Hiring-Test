import Message from '../domain/alien_grammar/Message';
import Type from '../domain/alien_grammar/Type';

export interface IMessage {
    hasBeenProcessed: boolean;
    leader: string;
}

export interface IWordValidate {
    description: string;
    valid: boolean;
    leader: string;
    type: String;
}

export interface IUpdateMessage {
    messageBefore: string;
    message: string;
}
