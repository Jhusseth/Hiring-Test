import Word from "../domain/alien_grammar/Word";
import {getManager} from "typeorm";

const  WordRepository = {

    getAllWords: (): Promise<Word[]> => {
        return getManager().getRepository(Word).find();
    },
    
    saveWord: async (word: Word): Promise<boolean> => {

        let saved = true;
        
        await getManager().getRepository(Word).save(word).then(() => { return true; }).catch(() => { return false; });

        return saved;

    },

    getWordsByMessage: async (message: any): Promise<Word[]> => {
            
        let words = await getManager().getRepository(Word).find({where: {message: message}, relations: ["type"]});

        return words;
    
    },

    getExistWords: async (msg: any, message: string, isUpdate:boolean): Promise<boolean> => {

        return await getManager().getRepository(Word).find({where: {message: msg}})
        .then((result) => {

            let words = []
            for(let word of result) {
                words.push(word.text.toLowerCase());
            }

            const msjBefore = words;
            const msjAfter = message.toLowerCase().split(" ");

            console.log(msjBefore.sort().toString());
            console.log(msjAfter.sort().toString());

            if(msjBefore.sort().toString() === msjAfter.sort().toString()) {

                if(isUpdate) {
                    
                    for(let word of result) {
                        getManager().getRepository(Word).remove(word);
                    }
                }

                return true
            }
            else{

                return false

            }

        })
        .catch(() => { 
            return null; 
        });
    },

}

export default WordRepository;
