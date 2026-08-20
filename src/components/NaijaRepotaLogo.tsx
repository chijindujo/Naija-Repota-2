import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'green' | 'white' | 'dark';
}

export const NaijaRepotaLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'green',
}) => {
  // Dimensions map
  const dimensions = {
    sm: { icon: 28, textClass: 'text-base', gap: 'gap-2' },
    md: { icon: 38, textClass: 'text-xl', gap: 'gap-2.5' },
    lg: { icon: 52, textClass: 'text-2xl', gap: 'gap-3' },
    xl: { icon: 72, textClass: 'text-4xl', gap: 'gap-4' },
  };

  const currentDim = dimensions[size] || dimensions.md;

  // Colors
  const mainColor = variant === 'white' ? '#FFFFFF' : variant === 'dark' ? '#0f172a' : '#16a34a';
  const textColor = variant === 'white' ? 'text-white' : variant === 'dark' ? 'text-slate-900' : 'text-emerald-700';

  return (
    <div className={`inline-flex items-center select-none ${currentDim.gap} ${className}`} id="naija-repota-brand-logo">
      {/* SVG Icon matching the uploaded logo: Bold N with megaphone integrated */}
      <svg
        width={currentDim.icon}
        height={currentDim.icon}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Background / Main Green N shape */}
        <path
          d="M 32 30 
             L 78 30 
             L 78 75 
             L 122 135 
             L 122 30 
             L 168 30 
             L 168 170 
             L 122 170 
             L 78 105 
             L 78 170 
             L 32 170 
             Z"
          fill={mainColor}
        />
        
        {/* Megaphone cutout / overlay inside the N */}
        {/* Megaphone body */}
        <path
          d="M 68 88
             C 68 84 72 80 77 80
             L 94 80
             L 126 58
             C 134 52 142 57 142 66
             L 142 134
             C 142 143 134 148 126 142
             L 94 120
             L 77 120
             C 72 120 68 116 68 112
             Z"
          fill="#FFFFFF"
        />

        {/* Megaphone handle */}
        <path
          d="M 80 120
             L 80 138
             C 80 144 74 148 68 146
             C 63 144 60 139 60 134
             L 60 114
             C 60 108 64 104 70 104
             L 76 104
             Z"
          fill="#FFFFFF"
        />

        {/* Inner cone bell hole in megaphone */}
        <ellipse
          cx="134"
          cy="100"
          rx="7"
          ry="20"
          fill={mainColor}
        />
      </svg>

      {/* Typography: "Naija" on top, "Repota" below */}
      {showText && (
        <div className="flex flex-col leading-none font-bold tracking-tight">
          <span className={`${currentDim.textClass} ${textColor} font-black tracking-tight leading-none`}>
            Naija
          </span>
          <span className={`${currentDim.textClass} ${textColor} font-bold tracking-tight leading-none`}>
            Repota
          </span>
        </div>
      )}
    </div>
  );
};
