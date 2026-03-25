export class CustomerMetadata {

    customerId: string;
    firstname: string;
    lastname: string;
    version:number;

    constructor(customerId: string, firstname: string, lastname: string, version: number) {
        this.customerId = customerId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.version = version;
    }

}