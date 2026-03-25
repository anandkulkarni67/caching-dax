import {
  Controller,
  Get,
  Route,
  Tags
} from "tsoa";
import { Status } from '../../model/data/Status';
import { ServiceStatusValue } from '../../model/data/ServiceStatusValue';
import { Service } from '../../model/data/Service';
import { getEnvironment } from '../../util/environment';

@Tags("Healthcheck")
@Route("/v1/healthcheck")
export class HealthcheckController extends Controller {

  @Get('/app')
  public async getAppHealth(): Promise<Status> {
    this.setStatus(200);
    return new Status(Service.APPLICATION, ServiceStatusValue.UP,
            {
                Environment: getEnvironment()
            }
        )
  }
}