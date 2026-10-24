import React, { useState } from 'react';
import { X, Check, RotateCcw } from 'lucide-react';

interface CustomizeModalProps {
  currentNickname: string;
  currentSenderName: string;
  onSave: (nickname: string, senderName: string) => void;
  onClose: () => void;
  onResetDefaults: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  currentNickname,
  currentSenderName,
  onSave,
  onClose,
  onResetDefaults,
}) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [senderName, setSenderName] = useState(currentSenderName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      nickname.trim() || 'Pakode Jaise Naak',
      senderName.trim() || 'Nikhil'
    );
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-[#FFFDF8] border border-[#D9A5B3]/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close settings"
          className="absolute top-5 right-5 p-2 rounded-full text-[#735364] hover:text-[#563C4A] hover:bg-[#F8E8ED] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-serif text-2xl font-bold text-[#563C4A] mb-1">
          Customize Your Love Story ✏️
        </h3>
        <p className="text-xs text-[#735364] mb-5">
          Personalize the names in this surprise. Saved securely in your browser!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nickname-input"
              className="block text-xs font-semibold text-[#563C4A] uppercase tracking-wider mb-1"
            >
              Girlfriend&apos;s Nickname
            </label>
            <input
              id="nickname-input"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g. Pakode Jaise Naak"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D9A5B3]/60 text-sm text-[#563C4A] focus:outline-none focus:ring-2 focus:ring-[#D9A5B3]"
            />
          </div>

          <div>
            <label
              htmlFor="sender-input"
              className="block text-xs font-semibold text-[#563C4A] uppercase tracking-wider mb-1"
            >
              Sender&apos;s Name (You)
            </label>
            <input
              id="sender-input"
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Nikhil"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D9A5B3]/60 text-sm text-[#563C4A] focus:outline-none focus:ring-2 focus:ring-[#D9A5B3]"
            />
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onResetDefaults();
                onClose();
              }}
              className="text-xs text-[#735364] hover:text-[#563C4A] flex items-center gap-1 cursor-pointer py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to default joke</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-full bg-[#563C4A] text-white hover:bg-[#432e3a] text-xs sm:text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save & Update</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
