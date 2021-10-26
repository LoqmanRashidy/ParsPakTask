import { AttachFile } from '../entity/basesystem/AttachFile';

export interface ReturnDataAndFiles<TData> {    
    Data : TData;    
    Files : AttachFile[];
}