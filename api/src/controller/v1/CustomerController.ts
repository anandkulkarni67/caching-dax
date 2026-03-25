import {
  Body,
  Controller,
  Get,
  Put,
  Delete,
  Path,
  Post,
  Query,
  Route,
  Tags
} from "tsoa";
import { CustomerMetadata } from "../../model/data/CustomerMetadata";
import { customerService } from "../../service/Customer.service";

@Tags("Customers")
@Route("/v1/customers")
export class CustomerController extends Controller {

  @Get('{id}')
  public async getCustomer(
    @Path() id: string
  ): Promise<CustomerMetadata> {
    this.setStatus(200);
    return customerService.getCustomer(id);
  }

  @Post()
  public async createCustomer(
    @Body() CustomerMetadata: CustomerMetadata
  ): Promise<CustomerMetadata> {
    return customerService.addCustomer(CustomerMetadata);
  }

  @Put('{id}')
  public async updateCustomer(
    @Path() id: string,
    @Body() CustomerMetadata: CustomerMetadata
  ): Promise<CustomerMetadata> {
    this.setStatus(200);
    return customerService.updateCustomer(id, CustomerMetadata);
  }

  @Delete('{id}')
  public async deleteCustomer(
    @Path() id: string,
    @Query() version: number
  ): Promise<void> {
    this.setStatus(200);
    return customerService.deleteCustomer(id, version);
  }
}