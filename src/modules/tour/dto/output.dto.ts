
export class TourDTO {
  id: string;
  place: string;
  name: string;
  checkIn: Date;
  checkOut: Date;
  member: number;
  price: number;
  images: Array<string>;
}
