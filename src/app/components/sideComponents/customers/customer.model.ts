// route.model.ts
export class Customer {
    constructor(
      public customerId:string, 
      public customerName: string,
      public contact: string,
      public editMode: boolean
    ) {}
  }
  