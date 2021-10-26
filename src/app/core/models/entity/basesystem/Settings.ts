export class Setting  {

    Key: string;
    Value : string;
    FaTitle: string;
    DateChanged: Date;
    IsDeleted: boolean;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }