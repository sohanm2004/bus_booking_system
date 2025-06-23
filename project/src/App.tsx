import React, { useState, useEffect } from 'react';
import { Bus } from 'lucide-react';
import { sampleBuses } from './data/buses';
import { Bus as BusType, BookingData, TicketData } from './types';
import StepIndicator from './components/StepIndicator';
import CitySelection from './components/CitySelection';
import DateSelection from './components/DateSelection';
import BusSelection from './components/BusSelection';
import SeatSelection from './components/SeatSelection';
import Payment from './components/Payment';
import Ticket from './components/Ticket';

type Step = 'cities' | 'date' | 'buses' | 'seats' | 'payment' | 'ticket';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('cities');
  const [buses] = useState<BusType[]>(sampleBuses);
  const [bookingData, setBookingData] = useState<BookingData>({
    source: '',
    destination: '',
    date: '',
    selectedBus: null,
    seats: 1,
    paymentMethod: '',
    paymentDetails: {},
  });
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  const stepLabels = ['Cities', 'Date', 'Buses', 'Seats', 'Payment', 'Ticket'];
  const stepOrder: Step[] = ['cities', 'date', 'buses', 'seats', 'payment', 'ticket'];
  const currentStepIndex = stepOrder.indexOf(currentStep) + 1;

  const availableSources = [...new Set(buses.map(bus => bus.source))].sort();
  
  const availableDestinations = bookingData.source
    ? [...new Set(buses.filter(bus => bus.source === bookingData.source).map(bus => bus.destination))].sort()
    : [];

  const availableBuses = buses.filter(
    bus =>
      bus.source === bookingData.source &&
      bus.destination === bookingData.destination &&
      bus.date === bookingData.date &&
      bus.availableSeats > 0
  );

  const handleCityNext = () => {
    if (bookingData.source && bookingData.destination) {
      setCurrentStep('date');
    }
  };

  const handleDateNext = () => {
    if (bookingData.date) {
      setCurrentStep('buses');
    }
  };

  const handleBusNext = () => {
    if (bookingData.selectedBus) {
      setCurrentStep('seats');
    }
  };

  const handleSeatsNext = () => {
    setCurrentStep('payment');
  };

  const handlePaymentComplete = (paymentDetails: any) => {
    const ticket: TicketData = {
      ...bookingData,
      bookingId: `RN${Date.now()}`,
      totalAmount: (bookingData.selectedBus?.fare || 0) * bookingData.seats,
      bookingTime: new Date().toISOString(),
    };
    setTicketData(ticket);
    setCurrentStep('ticket');
  };

  const handleNewBooking = () => {
    setBookingData({
      source: '',
      destination: '',
      date: '',
      selectedBus: null,
      seats: 1,
      paymentMethod: '',
      paymentDetails: {},
    });
    setTicketData(null);
    setCurrentStep('cities');
  };

  // Reset destination when source changes
  useEffect(() => {
    if (bookingData.source) {
      setBookingData(prev => ({ ...prev, destination: '' }));
    }
  }, [bookingData.source]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm shadow-2xl sticky top-0 z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl shadow-lg shadow-purple-500/30">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">RideNest</h1>
                <p className="text-sm text-gray-300">Premium Bus Booking Experience</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentStep !== 'ticket' && (
          <StepIndicator
            currentStep={currentStepIndex}
            totalSteps={stepLabels.length - 1} // Exclude ticket from indicator
            stepLabels={stepLabels.slice(0, -1)}
          />
        )}

        <div className="transition-all duration-500 ease-in-out">
          {currentStep === 'cities' && (
            <CitySelection
              availableSources={availableSources}
              availableDestinations={availableDestinations}
              selectedSource={bookingData.source}
              selectedDestination={bookingData.destination}
              onSourceChange={(source) => setBookingData(prev => ({ ...prev, source }))}
              onDestinationChange={(destination) => setBookingData(prev => ({ ...prev, destination }))}
              onNext={handleCityNext}
            />
          )}

          {currentStep === 'date' && (
            <DateSelection
              selectedDate={bookingData.date}
              onDateChange={(date) => setBookingData(prev => ({ ...prev, date }))}
              onNext={handleDateNext}
              onBack={() => setCurrentStep('cities')}
            />
          )}

          {currentStep === 'buses' && (
            <BusSelection
              availableBuses={availableBuses}
              selectedBus={bookingData.selectedBus}
              onBusSelect={(bus) => setBookingData(prev => ({ ...prev, selectedBus: bus }))}
              onNext={handleBusNext}
              onBack={() => setCurrentStep('date')}
            />
          )}

          {currentStep === 'seats' && bookingData.selectedBus && (
            <SeatSelection
              selectedBus={bookingData.selectedBus}
              selectedSeats={bookingData.seats}
              onSeatsChange={(seats) => setBookingData(prev => ({ ...prev, seats }))}
              onNext={handleSeatsNext}
              onBack={() => setCurrentStep('buses')}
            />
          )}

          {currentStep === 'payment' && (
            <Payment
              bookingData={bookingData}
              totalAmount={(bookingData.selectedBus?.fare || 0) * bookingData.seats}
              onPaymentComplete={handlePaymentComplete}
              onBack={() => setCurrentStep('seats')}
            />
          )}

          {currentStep === 'ticket' && ticketData && (
            <Ticket
              ticketData={ticketData}
              onNewBooking={handleNewBooking}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16 border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg mr-3">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">RideNest</span>
          </div>
          <p className="text-gray-400">
            © 2025 RideNest. Your premium travel companion for comfortable journeys.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;