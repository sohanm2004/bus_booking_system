import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

interface CitySelectionProps {
  availableSources: string[];
  availableDestinations: string[];
  selectedSource: string;
  selectedDestination: string;
  onSourceChange: (source: string) => void;
  onDestinationChange: (destination: string) => void;
  onNext: () => void;
}

const CitySelection: React.FC<CitySelectionProps> = ({
  availableSources,
  availableDestinations,
  selectedSource,
  selectedDestination,
  onSourceChange,
  onDestinationChange,
  onNext,
}) => {
  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Plan Your Journey</h2>
        <p className="text-gray-300">Select your departure and destination cities</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-3">
            <MapPin className="inline w-4 h-4 mr-2 text-purple-400" />
            From (Source City)
          </label>
          <select
            value={selectedSource}
            onChange={(e) => onSourceChange(e.target.value)}
            className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white"
          >
            <option value="">Select departure city</option>
            {availableSources.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-3">
            <MapPin className="inline w-4 h-4 mr-2 text-pink-400" />
            To (Destination City)
          </label>
          <select
            value={selectedDestination}
            onChange={(e) => onDestinationChange(e.target.value)}
            disabled={!selectedSource}
            className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <option value="">Select destination city</option>
            {availableDestinations.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedSource && selectedDestination && (
        <div className="flex items-center justify-center mb-6 p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl border border-purple-500/30">
          <span className="font-semibold text-purple-200">
            {selectedSource} <ArrowRight className="inline w-4 h-4 mx-2 text-pink-400" /> {selectedDestination}
          </span>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!selectedSource || !selectedDestination}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg shadow-purple-500/30"
      >
        Continue to Date Selection
      </button>
    </div>
  );
};

export default CitySelection;