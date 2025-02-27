// src/app/book.ts
// src/app/book.ts
export class Book {
  constructor(
    public id: string,
    public ISBN: string,
    public title: string,
    public author: string,
    public year: number,
    public price: number,
    public featured: boolean,
    public coverImages: string[],
    public description?: string // Make description optional
  ) {}
}

  /*export interface Book {
  id: string; // This is now the primary key
  ISBN: string;
  title: string;
  author: string;
  year: number;
  price: number;
  featured: boolean;
  description?: string;
  coverImages: string[];
}
 */