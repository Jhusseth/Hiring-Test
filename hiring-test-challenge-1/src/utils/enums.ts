export enum RoleEnum {
    ADMIN_USER = 'ADMIN_USER',
    COMPANY_USER = 'COMPANY_USER'
}

export enum OrderEventTypeValues {
    ORDER_CREATED = 'ORDER_CREATED',
    ORDER_PAYMENT_COMPLETED = 'ORDER_PAYMENT_COMPLETED',
    ORDER_REJECTED = 'ORDER_REJECTED',
    ORDER_CANCELED = 'ORDER_CANCELED',
    ORDER_CANCELED_BY_USER = 'ORDER_CANCELED_BY_USER'
}

export enum TypeEnum {
    INFO = 'INFO',
    WARNING = 'WARNING',
    DANGER = 'DANGER'
}

export enum MessageStatusEnum {

    MSG_SAVED_SUCCESS = 'Se han guardado correctamente el mensaje',
    MSG_SAVED_FAIL = 'Ha ocurrido un error al guardar el mensaje',
    MSG_LEADER = 'Este mensaje fue enviado por Alien Leader ',
    MSG_INVALID = 'Es un mensaje falso solo para distraer',
    WORD_VALID = 'Es una palabra válida',
    WORD_INVALID = 'Palabra no válida',
    MSG_UPDATE_NO_FOUND = 'No se han encontrado mensajes con el texto: ',
    MSG_UPDATE_SUCCESS = 'Se ha actualizado correctmante el mensaje: ',
    MSG_UPDATE_FAIL = 'No se han podido actualizar el mensaje',
    MSG_UPDATE_OUT_TIME = 'No se puede actualizar el mensaje porque ha pasado más de 5 minutos desde que se creó',
    MSG_SAVED_VALIDATION_FAIL = 'Mensaje ya existente',
}
