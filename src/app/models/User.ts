import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table"

export interface User
{
    id: number
    name: string
    username: string
    email: string
    phone: string
    website: string
    address:Address
    company:Company
}

export interface Company
{
    name: string
    catchPhrase: string
    bs: string
}
export interface Address
{
    street: string
    suite: string
    city: string
    zipcode: string
    geo:Geo
}

export interface Geo{
    lat: string
    lng: string
}


export interface ColumnItem {
    name: string
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<User> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<User> | null;
 }