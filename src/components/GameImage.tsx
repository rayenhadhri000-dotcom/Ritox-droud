import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';

interface GameImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

export function GameImage({ src, alt, title, className = '' }: GameImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0F1813] via-[#0B100D] to-[#070908] text-[#8EA698] p-6 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Gamepad2 className="w-8 h-8 text-[#22C55E]/60 mb-2" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wide text-[#B7C7BD] text-center">
          {title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
