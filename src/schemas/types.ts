export interface Car {
  brand: string;
  model: string;
  color: string;
  countryOfOrigin?: string;
  yearOfCreation?: number;
}

export type RquiredCarValidationFields = Array<keyof Car>;
