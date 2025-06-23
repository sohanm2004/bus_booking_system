import React from 'react';
import { Calendar } from 'lucide-react';

interface DateSelectionProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  selectedDate,
  onDateChange,
  onNext,
  onBack,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Choose Travel Date</h2>
        <p className="text-gray-300">Select your preferred journey date</p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <label className="block text-sm font-semibold text-gray-200 mb-3">
          <Calendar className="inline w-4 h-4 mr-2 text-purple-400" />
          Journey Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={today}
          max={maxDateStr}
          className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white"
        />
        {selectedDate && (
          <p className="text-sm text-gray-400 mt-2">
            Selected: {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
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
          disabled={!selectedDate}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg shadow-purple-500/30"
        >
          Find Buses
        </button>
      </div>
    </div>
  );
};

export default DateSelection;