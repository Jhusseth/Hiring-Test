export default class ServiceResponse {

    detail: string
    status: number

    constructor(detail: string, status: number) {
        this.detail = detail;
        this.status = status;
    }
}