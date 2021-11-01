import { Injectable } from '@angular/core';
import { QueryRequestDto } from "./subido-fe-client";


@Injectable()
export class GlobalDataService {

  queryRequestDto: QueryRequestDto = {
    pageNumber: 0,
    pageSize: 3,
    sorts: [],
    fieldFilters: []
  };
}
