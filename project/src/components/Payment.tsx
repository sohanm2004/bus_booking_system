import React, { useState } from 'react';
import { CreditCard, Smartphone, Lock } from 'lucide-react';
import { BookingData } from '../types';

interface PaymentProps {
  bookingData: BookingData;
  totalAmount: number;
  onPaymentComplete: (paymentDetails: any) => void;
  onBack: () => void;
}

const Payment: React.FC<PaymentProps> = ({
  bookingData,
  totalAmount,
  onPaymentComplete,
  onBack,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [formData, setFormData] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onPaymentComplete({
      method: paymentMethod,
      details: paymentMethod === 'upi' ? { upiId: formData.upiId } : {
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
      }
    });
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Payment</h2>
        <p className="text-gray-300">Complete your booking with secure payment</p>
      </div>

      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 mb-8 border border-purple-500/30">
        <h3 className="font-semibold text-purple-200 mb-4">Booking Summary</h3>
        <div className="space-y-2 text-purple-300">
          <p>{bookingData.source} → {bookingData.destination}</p>
          <p>{bookingData.selectedBus?.id} • {bookingData.date}</p>
          <p>{bookingData.seats} seat(s) × ₹{bookingData.selectedBus?.fare}</p>
          <div className="border-t border-purple-500/30 pt-2 mt-2">
            <p className="text-xl font-bold text-purple-200">Total: ₹{totalAmount}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-200 mb-4">Payment Method</h4>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setPaymentMethod('upi')}
            className={`p-4 rounded-xl border-2 transition-all ${
              paymentMethod === 'upi'
                ? 'border-purple-500 bg-gradient-to-r from-purple-900/50 to-pink-900/50'
                : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
            }`}
          >
            <Smartphone className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <p className="font-semibold text-white">UPI</p>
          </button>
          <button
            onClick={() => setPaymentMethod('card')}
            className={`p-4 rounded-xl border-2 transition-all ${
              paymentMethod === 'card'
                ? 'border-purple-500 bg-gradient-to-r from-purple-900/50 to-pink-900/50'
                : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
            }`}
          >
            <CreditCard className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <p className="font-semibold text-white">Card</p>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        {paymentMethod === 'upi' ? (
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              UPI ID
            </label>
            <input
              type="text"
              value={formData.upiId}
              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
              placeholder="yourname@upi"
              required
              className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-400"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={formData.cardName}
                onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                placeholder="Enter cardholder name"
                required
                className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
                required
                className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  placeholder="MM/YY"
                  required
                  className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  placeholder="123"
                  required
                  className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center mt-6 text-sm text-gray-400">
          <Lock className="w-4 h-4 mr-2 text-emerald-400" />
          Your payment information is secure and encrypted
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={onBack}
            disabled={isProcessing}
            className="flex-1 bg-gray-700 text-gray-200 font-semibold py-4 rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-50 border border-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-4 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 transform hover:scale-[1.02] shadow-lg shadow-emerald-500/30"
          >
            {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;