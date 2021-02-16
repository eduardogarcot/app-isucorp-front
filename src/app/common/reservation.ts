export interface Reservation {
  reservationId: number;
  createdDate: Date;
  reservationDate: Date;
  isfavorite: boolean;
  rate: number;
  contactId: number;
  contactName: string;
}
