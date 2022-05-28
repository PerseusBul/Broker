export * from './authentication.service';
// export * from './dataSources.service';
// import { DataSourcesService } from './dataSources.service';
export * from './health.service';
export * from './users.service';
import { AuthenticationService } from './authentication.service';
import { HealthService } from './health.service';
import { UsersService } from './users.service';

export const APIS = [AuthenticationService, HealthService, UsersService]; //DataSourcesService,
