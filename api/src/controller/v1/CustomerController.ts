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
import { UpdateCustomerMetadata } from "../../model/data/UpdateCustomerMetadata";
import { customerService } from "../../service/Customer.service";
import { GetCustomerMetadata } from "../../model/data/GetCustomerMetadata";
import { CreateCustomerMetadata } from "../../model/data/CreateCustomerMetadata";

@Tags("Customers")
@Route("/v1/customers")
export class CustomerController extends Controller {

  @Get('{id}')
  public async getCustomer(
    @Path() id: string
  ): Promise<GetCustomerMetadata> {
    this.setStatus(200);
    return customerService.getCustomer(id);
  }

  @Post()
  public async createCustomer(
    @Body() CustomerMetadata: CreateCustomerMetadata
  ): Promise<GetCustomerMetadata> {
    this.setStatus(200);
    return customerService.addCustomer(CustomerMetadata);
  }

  @Put('{id}')
  public async updateCustomer(
    @Path() id: string,
    @Body() CustomerMetadata: UpdateCustomerMetadata
  ): Promise<GetCustomerMetadata> {
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