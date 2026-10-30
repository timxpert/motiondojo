import React from 'react';

interface NinjaAvatarProps {
  name: string;
  specialty?: string;
  className?: string;
}

export const NinjaAvatar: React.FC<NinjaAvatarProps> = ({ name, specialty, className = '' }) => {
  // Generate deterministic gentle gradient based on name string
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'KJ';

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1D1838] via-[#15112A] to-[#0D0A1A] text-white relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C8FF3D_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Brand geometric emblem */}
      <div className="w-12 h-12 rounded-xl bg-[#6D32E8]/40 border border-[#A77BFF]/30 flex items-center justify-center mb-1 shadow-inner relative z-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#C8FF3D]">
          <path d="M12 3L20 12L12 21L4 12L12 3Z" fill="#C8FF3D" opacity="0.8" />
          <path d="M8.5 12H15.5" stroke="#14102A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <span className="font-heading font-extrabold text-sm tracking-wider text-white/90 relative z-10">
        {initials}
      </span>
      {specialty && (
        <span className="text-[10px] text-[var(--color-muted)] font-medium max-w-[80%] truncate mt-0.5 relative z-10 opacity-75">
          {specialty}
        </span>
      )}
    </div>
  );
};
