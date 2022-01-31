import {getManager, UpdateResult} from "typeorm";
import {TypeEnum, MessageStatusEnum} from "../utils/enums";
import Message from '../domain/alien_grammar/Message';
import {IMessage} from '../interfaces/Interfaces';

const  MessageRepository = {

    saveMessage: async (message: any): Promise<Message> => {

        let response = new Message();

        let newMessage: IMessage = { hasBeenProcessed: message.hasBeenProcessed, leader: message.leader }; 
        
        response.hasBeenProcessed = newMessage.hasBeenProcessed;
        response.leader = newMessage.leader;

        await getManager().getRepository(Message).save(newMessage).then((result: Message) => { 
            response.id = result.id;
            response.createdAt  = result.createdAt;
        }).catch((err) => { console.log(err); });

        return response;

    },

    updateMessage(message: Message): Promise<UpdateResult> {

        return getManager().getRepository(Message).update(message.id, message);

    },

    getMessageById(id: string): Promise<Message> {   
        return getManager().getRepository(Message).findOne(id);
    },

    getMessages : async (): Promise<Message[]> => {    
        
        return await getManager().getRepository(Message).createQueryBuilder("message")
        .select(['message.createdAt', 'message.valid', 'message.leader', 'word.text', 'word.description', 'word.valid', 'type.value'])
        .innerJoin("message.words", "word")
        .innerJoin("word.type", "type")
        .getMany();
    },

    getInternMessages : async (): Promise<Message[]> => { 

        return await getManager().getRepository(Message).find();

    },

    getMessagesByDate: async (initialDate: Date, endDate: Date): Promise<Message[]> => {
            
        let response: Message[] = [];

        await getManager().getRepository(Message).createQueryBuilder("message")
        .select(['message.createdAt', 'message.valid', 'message.leader', 'word.text', 'word.description', 'word.valid', 'type.value'])
        .innerJoin("message.words", "word")
        .innerJoin("word.type", "type")
        .where("message.createdAt BETWEEN :initialDate AND :endDate", { initialDate, endDate }).getMany().then((result: Message[]) => {
            response = result;
        }).catch((err) => { console.log(err); });

        return response;
    },

    getMessagesbyLeader: async (leader: string): Promise<Message[]> => {

        const query = MessageStatusEnum.MSG_LEADER + leader;

        return await getManager().getRepository(Message).createQueryBuilder("message")
        .select(['message.createdAt', 'message.valid', 'message.leader', 'word.text', 'word.description', 'word.valid', 'type.value'])
        .innerJoin("message.words", "word")
        .innerJoin("word.type", "type")
        .where("message.leader = :query", {query}).getMany();

    },

    getMessagesByType: async (type: TypeEnum): Promise<Message[]> => {
                
        return await getManager().getRepository(Message).createQueryBuilder("message")
        .select(['message.createdAt', 'message.valid', 'message.leader', 'word.text', 'word.description', 'word.valid', 'type.value'])
        .innerJoin("message.words", "word")
        .innerJoin("word.type", "type")
        .where("type.value = :type", {type}).getMany();
    },

    getMessagesByValid: async (valid: boolean): Promise<Message[]> => {
                    
        return await getManager().getRepository(Message).createQueryBuilder("message")
        .select(['message.createdAt', 'message.valid', 'message.leader', 'word.text', 'word.description', 'word.valid', 'type.value'])
        .innerJoin("message.words", "word")
        .innerJoin("word.type", "type")
        .where("message.valid = :valid", {valid}).getMany();
    }
    
}


export default MessageRepository;