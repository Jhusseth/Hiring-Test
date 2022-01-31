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
