import React from 'react';
import { CheckCircle, Download, Share, Calendar, Clock, MapPin, Users, CreditCard } from 'lucide-react';
import { TicketData } from '../types';

interface TicketProps {
  ticketData: TicketData;
  onNewBooking: () => void;
}

const Ticket: React.FC<TicketProps> = ({ ticketData, onNewBooking }) => {
  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto border border-gray-700">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-emerald-400 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-300">Your ticket has been generated successfully</p>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8 shadow-lg shadow-purple-500/30">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">🎫 E-TICKET</h3>
            <p className="opacity-90">Booking ID: {ticketData.bookingId}</p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="w-12 h-12 bg-white/30 rounded border-2 border-white/50"></div>
            </div>
            <p className="text-xs mt-1 opacity-75">QR Code</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm opacity-75">From</span>
            </div>
            <p className="text-xl font-semibold">{ticketData.source}</p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm opacity-75">To</span>
            </div>
            <p className="text-xl font-semibold">{ticketData.destination}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="flex items-center mb-1">
              <Calendar className="w-4 h-4 mr-1 opacity-75" />
              <span className="text-xs opacity-75">Date</span>
            </div>
            <p className="font-semibold">{ticketData.date}</p>
          </div>
          <div>
            <div className="flex items-center mb-1">
              <Clock className="w-4 h-4 mr-1 opacity-75" />
              <span className="text-xs opacity-75">Time</span>
            </div>
            <p className="font-semibold">{ticketData.selectedBus?.time}</p>
          </div>
          <div>
            <div className="flex items-center mb-1">
              <Users className="w-4 h-4 mr-1 opacity-75" />
              <span className="text-xs opacity-75">Seats</span>
            </div>
            <p className="font-semibold">{ticketData.seats}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-700/50 rounded-xl p-6 mb-8 border border-gray-600">
        <h4 className="font-semibold text-gray-200 mb-4">Booking Details</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Bus ID</p>
            <p className="font-semibold text-white">{ticketData.selectedBus?.id}</p>
          </div>
          <div>
            <p className="text-gray-400">Bus Type</p>
            <p className="font-semibold text-white">{ticketData.selectedBus?.isAC ? 'AC' : 'Non-AC'}</p>
          </div>
          <div>
            <p className="text-gray-400">Total Amount</p>
            <p className="font-semibold text-emerald-400">₹{ticketData.totalAmount}</p>
          </div>
          <div>
            <p className="text-gray-400">Payment Method</p>
            <p className="font-semibold capitalize flex items-center text-white">
              <CreditCard className="w-4 h-4 mr-1" />
              {ticketData.paymentMethod}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/30 rounded-xl p-4 mb-8">
        <h5 className="font-semibold text-orange-200 mb-2">Important Instructions</h5>
        <ul className="text-sm text-orange-300 space-y-1">
          <li>• Please arrive 30 minutes before departure time</li>
          <li>• Carry a valid photo ID for verification</li>
          <li>• Show this e-ticket at the boarding point</li>
          <li>• Contact support for any queries or changes</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-colors flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Download className="w-4 h-4 mr-2" />
          Download
        </button>
        <button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-3 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-colors flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Share className="w-4 h-4 mr-2" />
          Share
        </button>
      </div>

      <button
        onClick={onNewBooking}
        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/30"
      >
        Book Another Ticket
      </button>
    </div>
  );
};

export default Ticket;