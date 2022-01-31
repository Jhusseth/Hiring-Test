import Type from '../domain/alien_grammar/Type';
import {getManager} from "typeorm";

const TypeRepository = {

    getAllTypes: () =>{
        const types = getManager().getRepository(Type).find();
        return types;
    },

    getTypeByValue: (value) =>{
        const types = getManager().getRepository(Type).findOne({value: value});
        return types;
    }


}

export default TypeRepository;