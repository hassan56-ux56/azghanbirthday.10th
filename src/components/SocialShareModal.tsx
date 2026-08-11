import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageSquare, Facebook, Twitter, QrCode } from 'lucide-react';
import { EventDetails } from '../types';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: EventDetails;
  guestName: string;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  eventDetails,
  guestName,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showQr, setShowQr] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href.split('?')[0];
  const shareUrl = `${currentUrl}?guest=${encodeURIComponent(guestName || 'Friend')}`;
  const shareText = `You are invited to ${eventDetails.fullName}'s Birthday Party on ${eventDetails.eventDate}! Open the invitation: ${shareUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  // Google Chart QR code API for instant mobile scanning
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#1A0B2E] border border-[#E6C363] rounded-2xl p-6 shadow-2xl text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-[#251147] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="w-12 h-12 rounded-full bg-[#251147] text-[#F5CE62] border border-[#E6C363] flex items-center justify-center mx-auto mb-3">
          <Share2 className="w-6 h-6" />
        </div>

        <h3 className="font-serif-display text-xl font-bold text-[#FFF0B3] mb-1">
          Share Invitation
        </h3>
        <p className="text-xs text-slate-300 mb-6 font-light">
          Invite friends & family to {eventDetails.fullName}&apos;s Birthday Party!
        </p>

        {/* QR Code Toggle Section */}
        {showQr ? (
          <div className="p-4 rounded-xl bg-[#251147] border border-[#E6C363]/30 mb-6">
            <img
              src={qrCodeUrl}
              alt="Party Invitation QR Code"
              className="w-44 h-44 mx-auto rounded-lg bg-white p-2 border border-[#E6C363]"
            />
            <p className="text-xs text-[#E6C363] mt-3 font-medium">Scan QR code on mobile camera</p>
            <button
              onClick={() => setShowQr(false)}
              className="mt-3 text-xs text-slate-300 underline hover:text-white"
            >
              Back to share options
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 mb-6">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#251147] border border-[#E6C363]/30 hover:border-[#E6C363] hover:scale-105 transition-all text-emerald-400 cursor-pointer"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-[10px] text-white font-medium">WhatsApp</span>
            </a>

            {/* Facebook */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#251147] border border-[#E6C363]/30 hover:border-[#E6C363] hover:scale-105 transition-all text-blue-400 cursor-pointer"
            >
              <Facebook className="w-6 h-6" />
              <span className="text-[10px] text-white font-medium">Facebook</span>
            </a>

            {/* Twitter */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#251147] border border-[#E6C363]/30 hover:border-[#E6C363] hover:scale-105 transition-all text-sky-400 cursor-pointer"
            >
              <Twitter className="w-6 h-6" />
              <span className="text-[10px] text-white font-medium">Twitter</span>
            </a>

            {/* QR Code */}
            <button
              onClick={() => setShowQr(true)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#251147] border border-[#E6C363]/30 hover:border-[#E6C363] hover:scale-105 transition-all text-[#F5CE62] cursor-pointer"
            >
              <QrCode className="w-6 h-6" />
              <span className="text-[10px] text-white font-medium">QR Code</span>
            </button>
          </div>
        )}

        {/* Copy Link Input Bar */}
        <div className="p-2 rounded-xl bg-[#251147] border border-[#E6C363]/40 flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent text-xs text-slate-200 px-2 focus:outline-none overflow-ellipsis"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-bold text-xs flex items-center gap-1.5 shrink-0 transition-transform cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
