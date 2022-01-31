import { BaseContext} from 'koa';
import StatusCodes from 'http-status-codes';
import service = require('../services/index');
import { TypeEnum } from '../utils/enums';

async function saveMessage(ctx): Promise<any> {

  const {message} =ctx.request.body;

  const res = await service.messageService.saveMessage(message)

  ctx.status = res.status;
  ctx.body = res;

}

async function updateMessage(ctx): Promise<any> {

  const message =ctx.request.body;

  let newMessage = {
    messageBefore: message.beforeMessage,
    message: message.message,
  }

  const res = await service.messageService.updateMessage(newMessage)

  ctx.status = StatusCodes.OK;
  ctx.body = res;

}

async function getMessagesByDate(ctx): Promise<any> {

  const {initialDate, endDate} =ctx.request.body;

  ctx.status = StatusCodes.OK;
  ctx.body = await service.messageService.getMessagesByDate(initialDate, endDate);

}

async function getMessages(ctx: BaseContext): Promise<any> {

  const {leader, valid, type} =ctx.query;

  let query = {leader: null, valid: null, type: null};

  if(leader) {

    query.leader = leader.toString().toUpperCase();

  }
  else if(valid) {

    query.valid = valid;

  }
  else if(type) {

    query.type = type.toString().toUpperCase();

  }

  if(query.leader) {

    ctx.status = StatusCodes.OK;
    ctx.body = await service.messageService.getMessagesByLeader(query.leader);

  }
  
  else if(query.valid){

    ctx.status = StatusCodes.OK;
    ctx.body = await service.messageService.getMessagesByValid(query.valid);

  }
  else if(query.type){

    let typeWord = TypeEnum.INFO;

    if(query.type === TypeEnum.DANGER){

      typeWord  = TypeEnum.DANGER;

    }
    else if(query.type === TypeEnum.WARNING){

      typeWord  = TypeEnum.WARNING;

    }

    ctx.status = StatusCodes.OK;
    ctx.body = await service.messageService.getMessagesByType(typeWord);
    
  }

  else{ 
    ctx.status = StatusCodes.OK;
    ctx.body = await service.messageService.getMessages();
  }

}


export default {
  saveMessage,
  updateMessage,
  getMessagesByDate,
  getMessages,
  
};
