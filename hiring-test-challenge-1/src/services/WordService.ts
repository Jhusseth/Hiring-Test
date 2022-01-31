import WordRepository from "../repository/WordRepository";
import TypeRepository from "../repository/TypeRepository";
import {IWordValidate} from "../interfaces/Interfaces";
import Word from "../domain/alien_grammar/Word";
import {TypeEnum, MessageStatusEnum} from "../utils/enums";

function getTypeWord(word: any) {
    let type = ""

    let values = [];

    for(let i = 1; i < word.length; i += 1) {

        let wd = word.toLowerCase()

        if((wd.charAt(i).match(/[bcdfghjklmnpqrstvwxyz]/))){
            values.push(wd.charAt(i))
        }

    }

    type = setType(values)

    return type;
}

function setType (myArray){ 

    let f = ""

    if(myArray[0]<myArray[1] && myArray[1]<myArray[2]){
        f = TypeEnum.DANGER;
    }
    else if(myArray[0]>myArray[1] && myArray[1]>myArray[2]){
        f = TypeEnum.WARNING;
    }
    else{
        f = TypeEnum.INFO;
    }


    return f;
}

const WordService = {

    getAllWords: async (): Promise<Array<any>> => {
        return await WordRepository.getAllWords();
    },

    getConstantInWord:(word: String):number  => {

        let consonants = 0;
    
        for(let i = 1; i < word.length; i += 1) {

            if((word.charAt(i).match(/[aeiou]/))){       
                
            } 
            else if((word.charAt(i).match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/))){
                consonants++;
            }

        }

        return consonants;
    },

    getValidWord(word: string, words: Array<string>): IWordValidate {

        let description = "";
        let valid = false;
        let first = word;
        let leader = "";

        for(let index = 1; index < words.length-1; index += 1) {
            let word = words[index];

            if(first.charAt(0) !== word.charAt(0)) {
                description = MessageStatusEnum.MSG_INVALID;
            }
            else{
                leader = MessageStatusEnum.MSG_LEADER + word.charAt(0);
            }
        }

        if(WordService.getConstantInWord(word)===3) {
            description = MessageStatusEnum.WORD_VALID
            valid = true;
        }
        else{
            description = MessageStatusEnum.WORD_INVALID
        }
        let type = getTypeWord(word);

        let result: IWordValidate = {description: description, valid: valid, leader: leader, type: type};

        return result;
    },

    saveWord: async (word: Word): Promise<boolean> => {

        const saved = await WordRepository.saveWord(word);

        return saved;

    },

    getWordsByMessage: async (message: any): Promise<boolean> => {

        let valid = false;

        let words = await WordRepository.getWordsByMessage(message);

        const value = words.length;

        if(words.length > 0) {

            let info = 0;
            let danger = 0;
            let warning = 0;

            words.forEach(word => { 
                if(word.type.value === TypeEnum.INFO) {
                    info++;
                }
                else if(word.type.value === TypeEnum.WARNING) {
                    warning++;
                }
                else{
                    danger++;
                }
            } );

            if(info === value || warning === value || danger === value) {
                valid = true;
            }

        }

        return valid;
    },

    getExistWords: async (msg: any, message: string, isUpdate:boolean): Promise<boolean> => {
        return await WordRepository.getExistWords(msg, message, isUpdate);
    }
}

export default WordService;

