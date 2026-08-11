import React, { useState } from 'react';
import { Copy, Check, Gift, CreditCard, Heart, Sparkles } from 'lucide-react';
import { GIFT_METHODS } from '../data/initialData';
import { GiftMethod } from '../types';
import { GalleryPhoto } from '../types';

interface GiftSectionProps {
  photos?: GalleryPhoto[];
  paypalEmail?: string;
  bankAccount?: string;
  eWalletNumber?: string;
}

export const GiftSection: React.FC<GiftSectionProps> = ({
  paypalEmail,
  bankAccount,
  eWalletNumber,
}) => {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('paypal');
  const [copied, setCopied] = useState<boolean>(false);

  // Allow custom override from props if provided
  const methods: GiftMethod[] = GIFT_METHODS.map((m) => {
    if (m.id === 'paypal' && paypalEmail) return { ...m, accountNumber: paypalEmail };
    if (m.id === 'bca' && bankAccount) return { ...m, accountNumber: bankAccount };
    if (m.id === 'e-wallet' && eWalletNumber) return { ...m, accountNumber: eWalletNumber };
    return m;
  });

  const activeMethod = methods.find((m) => m.id === selectedMethodId) || methods[0];

  const handleCopy = () => {
    if (!activeMethod) return;
    navigator.clipboard.writeText(activeMethod.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="gifts" className="relative py-12 px-4 sm:px-8 max-w-4xl mx-auto text-center">
      {/* Cursive Title with Lines: — Send Your Gift — */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E6C363] to-transparent flex-1 max-w-[120px]" />
        <h2 className="font-script text-4xl sm:text-6xl gold-text-gradient font-normal px-2">
          Send Your Gift
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-[#E6C363] to-transparent flex-1 max-w-[120px]" />
      </div>

      {/* Subtitle Message */}
      <p className="font-sans-body text-sm sm:text-base text-slate-200 max-w-lg mx-auto mb-8 leading-relaxed font-light">
        Thank you for adding a spirit of joy to Azghan&apos;s 10th birthday by giving your best gift and blessings!
      </p>

      {/* Gift Method Selector & Account Detail Card */}
      <div className="bg-gradient-to-b from-[#1D0C38] via-[#2A1152] to-[#15072B] border-2 border-[#E6C363]/40 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl">
        {/* Method Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                setSelectedMethodId(method.id);
                setCopied(false);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                selectedMethodId === method.id
                  ? 'gold-bg-gradient text-[#190933] border-[#F5CE62] shadow-lg scale-105'
                  : 'bg-[#120626] text-slate-300 border-[#E6C363]/30 hover:border-[#E6C363] hover:text-white'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>{method.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Method Details */}
        {activeMethod && (
          <div className="bg-[#120526] border border-[#E6C363]/30 rounded-2xl p-6 text-center max-w-md mx-auto shadow-xl">
            <div className="w-12 h-12 rounded-full gold-bg-gradient text-[#190933] flex items-center justify-center mx-auto mb-3 shadow-md">
              <CreditCard className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{activeMethod.label}</h3>
            <p className="text-xs text-slate-300 mb-4">{activeMethod.instruction}</p>

            {/* Account Box */}
            <div className="bg-[#1A0B2E] border border-[#E6C363]/40 rounded-xl p-3 flex items-center justify-between gap-3 mb-4">
              <div className="text-left overflow-hidden">
                <p className="text-[10px] text-[#E6C363] uppercase tracking-wider font-semibold">Account Number / Email</p>
                <p className="text-sm sm:text-base font-mono font-bold text-white truncate">{activeMethod.accountNumber}</p>
                <p className="text-xs text-slate-300">A/N: {activeMethod.accountName}</p>
              </div>

              <button
                onClick={handleCopy}
                className="px-3 py-2 rounded-xl gold-bg-gradient text-[#190933] font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-md shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-900" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <Heart className="w-3 h-3 text-[#F5CE62]" /> Your kindness is deeply appreciated!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

