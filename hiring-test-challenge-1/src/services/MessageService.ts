import MessageRepository from '../repository/MessageRepository';
import TypeRepository from '../repository/TypeRepository';
import {TypeEnum, MessageStatusEnum} from '../utils/enums';
import Message from '../domain/alien_grammar/Message';
import WordService from './WordService';
import {IMessage, IWordValidate, IUpdateMessage} from '../interfaces/Interfaces';
import Word from '../domain/alien_grammar/Word';
import Type from '../domain/alien_grammar/Type';
import ServiceResponse from '../utils/ServiceResponse';
import {pollAndDeleteMessagesFromSQS, sqsClient} from '../gateway/aws/SQS/sqsGateway';

const MessageService = {

    saveMessage: async (message: string): Promise<any> => {

        let saved = new ServiceResponse(MessageStatusEnum.MSG_SAVED_FAIL, 400);
        

        let validation = await getValidation(message);

        if(!validation) {

            let words = message.split(" ")

            let wordValidate: IWordValidate = WordService.getValidWord(words[0], words);

            let newMessage: IMessage = { hasBeenProcessed: false, leader: wordValidate.leader };

            const savedMsg = await MessageRepository.saveMessage(newMessage);

            if(savedMsg) {

                let type: Type = await TypeRepository.getTypeByValue(wordValidate.type);

                words.forEach(word => {

                    let newWord = new Word(word, wordValidate.description, type, savedMsg);

                    newWord.text = word;
                    newWord.type = type;
                    newWord.message = savedMsg;
                    newWord.valid = wordValidate.valid;
                    newWord.description = wordValidate.description;

                    if(newWord.text!==''){
                        WordService.saveWord(newWord);
                    }

                    saved = new ServiceResponse(MessageStatusEnum.MSG_SAVED_SUCCESS,200)
                });
            }
            else{
                saved = new ServiceResponse(MessageStatusEnum.MSG_SAVED_FAIL,400)
            }

            if(await WordService.getWordsByMessage(savedMsg)) {

                savedMsg.hasBeenProcessed = true;
                savedMsg.valid = true;
                MessageRepository.updateMessage(savedMsg);
            }
        }

        return saved;

    },

    updateMessage: async (message: IUpdateMessage): Promise<any> => {

        let messages: Message[] = await MessageRepository.getInternMessages();

        var FIVE_MIN=5

        var date = new Date();

        for (let msg of messages) {

            if(await WordService.getExistWords(msg,message.messageBefore,true)) {
               
                let msgActual: Message = await MessageRepository.getMessageById(msg.id);

                if((new Date(date.getTime()-msgActual.createdAt.getTime()).getMinutes()) < FIVE_MIN) {

                    let words = message.message.split(" ")

                    let wordValidate: IWordValidate = WordService.getValidWord(words[0], words);

                    let type: Type = await TypeRepository.getTypeByValue(wordValidate.type);

                    if(msgActual){

                        words.forEach(word => {

                            let newWord = new Word(word, wordValidate.description, type, msgActual);

                            newWord.text = word;
                            newWord.type = type;
                            newWord.message = msgActual;
                            newWord.valid = wordValidate.valid;
                            newWord.description = wordValidate.description;

                            if(newWord.text!==''){
                                WordService.saveWord(newWord);
                            }

                        });
                    } 
                    else{
                        return MessageStatusEnum.MSG_UPDATE_FAIL;
                    }                

                    if(await WordService.getWordsByMessage(msgActual)) {
                        msgActual.hasBeenProcessed = true;
                        msgActual.valid = true;

                        MessageRepository.updateMessage(msgActual)

                        return MessageStatusEnum.MSG_UPDATE_SUCCESS + msgActual.words.toString();
                    }
                    else{
                        return MessageStatusEnum.MSG_UPDATE_FAIL;
                    }

                }
                else{
                    return MessageStatusEnum.MSG_UPDATE_OUT_TIME;
                }

            }
            else{
                return MessageStatusEnum.MSG_UPDATE_NO_FOUND + message.messageBefore;
            }

        }
    
    },

    getMessagesByDate: async (initialDate: Date, endDate: Date): Promise<Message[]> => {

        MessageService.verificationMessages();

        let messages: Message[] = await MessageRepository.getMessagesByDate(initialDate, endDate);
        return messages;
    },

    getMessagesByLeader: async (leader: string): Promise<Message[]> => {

        MessageService.verificationMessages();
            
        let messages: Message[] = await MessageRepository.getMessagesbyLeader(leader);
        return messages;
    },
    
    getMessagesByType: async (type: TypeEnum): Promise<Message[]> => {

        MessageService.verificationMessages();

        let messages: Message[] = await MessageRepository.getMessagesByType(type);
        return messages;
    },

    getMessagesByValid: async (valid: boolean): Promise<Message[]> => {

        MessageService.verificationMessages();

        let messages: Message[] = await MessageRepository.getMessagesByValid(valid);
        return messages;
    },

    getMessages: async (): Promise<Message[]> => {

        MessageService.verificationMessages();

        let messages: Message[] = await MessageRepository.getMessages();

        return messages;

    },

    verificationMessages: async (): Promise<void> => {

        let messages: Message[] = await MessageRepository.getInternMessages();

        for(let msg of messages) {

            if(await WordService.getWordsByMessage(msg)) {
                msg.hasBeenProcessed = true;
                msg.valid = true;
                MessageRepository.updateMessage(msg);
            }
        }

    },
    
}

async function getValidation(message: string){

    let messages: Message[] = await MessageRepository.getInternMessages();

    let result = false;

    if(messages.length > 0) {

        for(let msg of messages) {
            if(await WordService.getExistWords(msg,message,false)) {
                result= true;
            }
        }
    }

    return result;

}

export default MessageService;

