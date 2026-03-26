import { CustomerMetadata } from "./CustomerMetadata";

export class GetCustomerMetadata extends CustomerMetadata {

    customerId: string;
    version: number;

    constructor(customerId: string, firstname: string, lastname: string, version: number) {
        super(firstname, lastname);
        this.customerId = customerId;
        this.version = version;
    }

}