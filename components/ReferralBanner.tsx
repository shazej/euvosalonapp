import React, { useState } from 'react';
import { Copy, Gift, Check } from 'lucide-react';
import { ReferralStats } from '../types';

interface ReferralBannerProps {
  stats: ReferralStats;
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({ stats }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(stats.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-secondary-500/20">
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
        <Gift size={120} />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2">Give $20, Get $20</h3>
        <p className="text-white/90 font-medium mb-4">
          Share your referral code with friends. They get a discount, and you earn credit!
        </p>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-wider text-white/70 font-bold">Your Code</p>
            <p className="text-xl font-mono font-bold tracking-widest text-white">{stats.code}</p>
          </div>
          
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-6 text-sm font-semibold">
          <div>
            <span className="block text-2xl font-bold text-accent">{stats.friendsInvited}</span>
            <span className="opacity-80">Friends Invited</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div>
            <span className="block text-2xl font-bold text-accent">${stats.earnings}</span>
            <span className="opacity-80">Credit Earned</span>
          </div>
        </div>
      </div>
    </div>
  );
};