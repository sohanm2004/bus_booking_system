import React from 'react';
import { Bus, Snowflake, Clock, Users, IndianRupee } from 'lucide-react';
import { Bus as BusType } from '../types';

interface BusSelectionProps {
  availableBuses: BusType[];
  selectedBus: BusType | null;
  onBusSelect: (bus: BusType) => void;
  onNext: () => void;
  onBack: () => void;
}

const BusSelection: React.FC<BusSelectionProps> = ({
  availableBuses,
  selectedBus,
  onBusSelect,
  onNext,
  onBack,
}) => {
  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Available Buses</h2>
        <p className="text-gray-300">Choose your preferred bus for the journey</p>
      </div>

      {availableBuses.length === 0 ? (
        <div className="text-center py-12">
          <Bus className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No buses available for selected route and date</p>
        </div>
      ) : (
        <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
          {availableBuses.map((bus) => (
            <div
              key={bus.id}
              onClick={() => onBusSelect(bus)}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 ${
                selectedBus?.id === bus.id
                  ? 'border-purple-500 bg-gradient-to-r from-purple-900/30 to-pink-900/30 shadow-lg shadow-purple-500/30'
                  : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                    <Bus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{bus.id}</h3>
                    <div className="flex items-center text-sm text-gray-300">
                      <Snowflake className="w-4 h-4 mr-1 text-cyan-400" />
                      {bus.isAC ? 'AC' : 'Non-AC'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-2xl font-bold text-emerald-400">
                    <IndianRupee className="w-5 h-5" />
                    {bus.fare}
                  </div>
                  <p className="text-sm text-gray-400">per seat</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="font-medium">{bus.time}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-4 h-4 mr-2 text-pink-400" />
                  <span className="font-medium">
                    {bus.availableSeats}/{bus.totalSeats} seats
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(bus.availableSeats / bus.totalSeats) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {bus.availableSeats > 10 ? 'Good availability' : 'Limited seats'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 text-gray-200 font-semibold py-4 rounded-xl hover:bg-gray-600 transition-colors border border-gray-600"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedBus}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg shadow-purple-500/30"
        >
          Select Seats
        </button>
      </div>
    </div>
  );
};

export default BusSelection;