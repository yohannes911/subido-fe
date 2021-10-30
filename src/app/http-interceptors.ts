import { environment } from '../environments/environment';
import { BASE_PATH } from "./subido-fe-client";

/** Http interceptor provider for API BASE_PATH value */
export const basePathInterceptorProvider = [
  {provide: BASE_PATH, useValue: environment.apiUrl}
];
