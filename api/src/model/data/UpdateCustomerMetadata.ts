import { CustomerMetadata } from "./CustomerMetadata";

export class UpdateCustomerMetadata extends CustomerMetadata {

    version:number;

    constructor(firstname: string, lastname: string, version: number) {
        super(firstname, lastname);
        this.version = version;
    }

}