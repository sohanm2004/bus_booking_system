import { Bus } from '../types';

export const sampleBuses: Bus[] = [
  // Bangalore to Mumbai
  {
    id: "B001",
    source: "Bangalore",
    destination: "Mumbai",
    date: "2025-07-01",
    time: "09:00",
    isAC: true,
    totalSeats: 40,
    availableSeats: 15,
    fare: 1200
  },
  {
    id: "B002",
    source: "Bangalore",
    destination: "Mumbai",
    date: "2025-07-01",
    time: "18:00",
    isAC: false,
    totalSeats: 40,
    availableSeats: 20,
    fare: 900
  },
  {
    id: "B006",
    source: "Bangalore",
    destination: "Mumbai",
    date: "2025-07-02",
    time: "06:00",
    isAC: true,
    totalSeats: 40,
    availableSeats: 14,
    fare: 1150
  },
  {
    id: "B007",
    source: "Bangalore",
    destination: "Mumbai",
    date: "2025-07-03",
    time: "14:00",
    isAC: true,
    totalSeats: 40,
    availableSeats: 22,
    fare: 1300
  },
  {
    id: "B008",
    source: "Bangalore",
    destination: "Mumbai",
    date: "2025-07-03",
    time: "20:00",
    isAC: false,
    totalSeats: 40,
    availableSeats: 19,
    fare: 950
  },

  // Delhi to Chennai
  {
    id: "B003",
    source: "Delhi",
    destination: "Chennai",
    date: "2025-07-01",
    time: "07:00",
    isAC: true,
    totalSeats: 40,
    availableSeats: 8,
    fare: 1500
  },
  {
    id: "B009",
    source: "Delhi",
    destination: "Chennai",
    date: "2025-07-02",
    time: "16:00",
    isAC: false,
    totalSeats: 40,
    availableSeats: 30,
    fare: 1200
  },
  {
    id: "B010",
    source: "Delhi",
    destination: "Chennai",
    date: "2025-07-03",
    time: "11:00",
    isAC: true,
    totalSeats: 40,
    availableSeats: 20,
    fare: 1600
  },

  // Hyderabad to Kerala
  {
    id: "B004",
    source: "Hyderabad",
    destination: "Kerala",
    date: "2025-07-02",
    time: "10:00",
    isAC: false,
    totalSeats: 40,
    availableSeats: 25,
    fare: 800
  },
  {
    id: "B011",
    source: "Hyderabad",
    destination: "Kerala",
    date: "2025-07-03",
    time: "08:30",
    isAC: true,
    totalSeats: 40,
    availableSeats: 18,
    fare: 1100
  },

  // Bangalore to Kerala
  {
    id: "B005",
    source: "Bangalore",
    destination: "Kerala",
    date: "2025-07-02",
    time: "16:30",
    isAC: true,
    totalSeats: 40,
    availableSeats: 12,
    fare: 1000
  },
  {
    id: "B012",
    source: "Bangalore",
    destination: "Kerala",
    date: "2025-07-03",
    time: "06:00",
    isAC: false,
    totalSeats: 40,
    availableSeats: 30,
    fare: 850
  },

  // Mumbai to Hyderabad
  {
    id: "B013",
    source: "Mumbai",
    destination: "Hyderabad",
    date: "2025-07-03",
    time: "09:00",
    isAC: true,
    totalSeats: 40,
    availableSeats: 20,
    fare: 1400
  }
];