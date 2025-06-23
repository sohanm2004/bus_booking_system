export interface Bus {
  id: string;
  source: string;
  destination: string;
  date: string;
  time: string;
  isAC: boolean;
  totalSeats: number;
  availableSeats: number;
  fare: number;
}

export interface BookingData {
  source: string;
  destination: string;
  date: string;
  selectedBus: Bus | null;
  seats: number;
  paymentMethod: 'upi' | 'card' | '';
  paymentDetails: {
    upiId?: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  };
}

export interface TicketData extends BookingData {
  bookingId: string;
  totalAmount: number;
  bookingTime: string;
}