import React from 'react';
import { Users, Minus, Plus } from 'lucide-react';
import { Bus } from '../types';

interface SeatSelectionProps {
  selectedBus: Bus;
  selectedSeats: number;
  onSeatsChange: (seats: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  selectedBus,
  selectedSeats,
  onSeatsChange,
  onNext,
  onBack,
}) => {
  const totalAmount = selectedSeats * selectedBus.fare;

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Select Seats</h2>
        <p className="text-gray-300">Choose the number of seats you want to book</p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 mb-6 border border-purple-500/30">
          <h3 className="font-semibold text-purple-200 mb-2">Selected Bus: {selectedBus.id}</h3>
          <p className="text-purple-300">Available Seats: {selectedBus.availableSeats}</p>
        </div>

        <div className="text-center mb-6">
          <label className="block text-sm font-semibold text-gray-200 mb-4">
            <Users className="inline w-4 h-4 mr-2 text-purple-400" />
            Number of Seats
          </label>
          
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => onSeatsChange(Math.max(1, selectedSeats - 1))}
              disabled={selectedSeats <= 1}
              className="w-12 h-12 bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
            >
              <Minus className="w-5 h-5" />
            </button>
            
            <div className="w-20 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-2xl font-bold text-white">{selectedSeats}</span>
            </div>
            
            <button
              onClick={() => onSeatsChange(Math.min(selectedBus.availableSeats, selectedSeats + 1))}
              disabled={selectedSeats >= selectedBus.availableSeats}
              className="w-12 h-12 bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 rounded-xl p-6 text-center border border-emerald-500/30">
          <h4 className="font-semibold text-emerald-200 mb-2">Booking Summary</h4>
          <div className="space-y-2 text-emerald-300">
            <p>{selectedSeats} seat(s) × ₹{selectedBus.fare}</p>
            <div className="border-t border-emerald-500/30 pt-2">
              <p className="text-2xl font-bold text-emerald-400">Total: ₹{totalAmount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 text-gray-200 font-semibold py-4 rounded-xl hover:bg-gray-600 transition-colors border border-gray-600"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-4 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-emerald-500/30"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;