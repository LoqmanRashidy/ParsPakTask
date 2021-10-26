// import { State as s, SortDescriptor, CompositeFilterDescriptor, GroupDescriptor} from '@progress/kendo-data-query';

import { Injector, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


export class State{
  skip?: number=10;
  take?: number=10;
  filter?: CustomCompositeFilterDescriptor;

  attr?: Array<number>;
  stationId?: number=0;
  query?: string;
  level?: number;
  type?: number;
  source?: number;
  q?: string;
  extant?: string;
  from?: number;
  to?: number;
  startDate?: string
  endDate?: string
  request_input?: number;
}

export interface CustomCompositeFilterDescriptor {
  logic: 'or' | 'and';
  filters: Array<CustomFilterDescriptor>;
}

export interface CustomFilterDescriptor {
  field?: string | Function;
  operator: string | Function;
  value?: any;
  ignoreCase?: boolean;
}


