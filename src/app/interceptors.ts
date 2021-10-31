import { environment } from '../environments/environment';
import { BASE_PATH } from "./subido-fe-client";
import { OWL_DATE_TIME_LOCALE } from "@danielmoncada/angular-datetime-picker";

/** Http interceptor provider for API BASE_PATH value */
export const todoInterceptorProvider = [
  {provide: BASE_PATH, useValue: environment.apiUrl},
  {provide: OWL_DATE_TIME_LOCALE, useValue: 'hu'}
];
