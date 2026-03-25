import { ServiceStatusValue } from './ServiceStatusValue';
import { Service } from './Service';

export class Status {

    service: Service;
    status: ServiceStatusValue;
    metadata?: any;

    constructor(service: Service, status: ServiceStatusValue, metadata?: Object) {
        this.service = service;
        this.status = status;
        this.metadata = metadata;
    }
}