import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, stepLabels }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : isCurrent
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-700 text-gray-400 border border-gray-600'
                  }`}
                >
                  {isCompleted ? <Check size={16} /> : stepNumber}
                </div>
                <span className={`text-xs mt-2 font-medium ${isCurrent ? 'text-purple-400' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-gray-700'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;