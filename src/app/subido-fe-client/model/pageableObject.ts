/**
 * subido-app
 * Subi-dubi todo management application
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Sort } from './sort';


export interface PageableObject { 
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    unpaged?: boolean;
    offset?: number;
    sort?: Sort;
}
