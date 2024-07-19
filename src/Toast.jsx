export default class Toast {
    type;
    message;

    constructor(type, message) {
        this.type = type ? type : 'info';
        this.message = message ? message : 'message_unset';
    }
}