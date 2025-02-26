// src/app/book.ts
export class Book {
    constructor(
      public ISBN: string,
      public title: string,
      public author: string,
      public year: number,
      public price: number,
      public featured: boolean,
      public coverImages: string[]
    ) {}
  }
  