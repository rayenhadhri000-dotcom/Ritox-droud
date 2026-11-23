import React from 'react';

interface AppIconProps {
  iconKey: string;
  title: string;
  accentColor: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-10 h-10 rounded-[10px]',
  md: 'w-12 h-12 rounded-[12px]',
  lg: 'w-14 h-14 rounded-[14px]',
  xl: 'w-20 h-20 rounded-[18px]',
};

const ICON_SVG_SIZE = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
  xl: 'w-10 h-10',
};

function renderGlyph(iconKey: string, title: string, accent: string, svgClass: string) {
  switch (iconKey) {
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path
            d="M14.5 3v10.2a3.7 3.7 0 1 1-2.6-3.54V6.9a6.5 6.5 0 1 0 5.3 6.38V8.2a7.2 7.2 0 0 0 3.8 1.1V6.5a4.4 4.4 0 0 1-3.8-3.5h-2.7Z"
            fill={accent}
            opacity="0.5"
            transform="translate(0.9, 0.7)"
          />
          <path
            d="M14.5 3v10.2a3.7 3.7 0 1 1-2.6-3.54V6.9a6.5 6.5 0 1 0 5.3 6.38V8.2a7.2 7.2 0 0 0 3.8 1.1V6.5a4.4 4.4 0 0 1-3.8-3.5h-2.7Z"
            fill="#ECF2EE"
          />
        </svg>
      );

    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke={accent} strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="#ECF2EE" strokeWidth="2" />
          <circle cx="17.2" cy="6.8" r="1.2" fill={accent} />
        </svg>
      );

    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path
            d="M14.5 21v-7.8h2.6l.4-3h-3V8.3c0-.87.24-1.46 1.5-1.46h1.6V4.15c-.28-.04-1.24-.12-2.35-.12-2.32 0-3.9 1.42-3.9 4.02v2.15H8.8v3h2.55V21h3.15Z"
            fill="#ECF2EE"
          />
        </svg>
      );

    case 'messenger':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path
            d="M12 3.8c-4.7 0-8.4 3.5-8.4 7.9 0 2.5 1.2 4.7 3.1 6.1V21l2.9-1.6c.8.2 1.6.3 2.4.3 4.7 0 8.4-3.5 8.4-7.9S16.7 3.8 12 3.8Z"
            stroke={accent}
            strokeWidth="1.8"
          />
          <path d="m7.5 13.6 3.1-3.3 2.7 2.1 3.2-2.1-3.1 3.3-2.7-2.1-3.2 2.1Z" fill="#ECF2EE" />
        </svg>
      );

    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path
            d="M12 3.5a8.5 8.5 0 0 0-7.35 12.76L3.6 20.4l4.26-1.02A8.5 8.5 0 1 0 12 3.5Z"
            stroke={accent}
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          <path
            d="M9.4 8.7c-.2-.45-.4-.46-.6-.47h-.5c-.18 0-.47.07-.72.34-.24.27-.94.92-.94 2.24s.96 2.6 1.1 2.78c.13.18 1.86 2.96 4.58 4.03 2.26.9 2.72.72 3.2.67.5-.04 1.58-.64 1.8-1.26.22-.62.22-1.15.16-1.26-.07-.11-.25-.18-.52-.31s-1.58-.78-1.83-.87c-.24-.09-.42-.14-.6.13-.18.27-.7.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.16-1.33-.8-.71-1.34-1.59-1.5-1.86-.15-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.59-1.45-.82-1.97Z"
            fill="#ECF2EE"
          />
        </svg>
      );

    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path
            d="M20.6 4.4 3.4 11.1c-1.17.47-1.16 1.12-.21 1.42l4.4 1.37 10.18-6.42c.48-.3.92-.13.56.19l-8.25 7.45-.31 4.56c.45 0 .65-.2.9-.45l2.16-2.1 4.5 3.32c.83.46 1.43.22 1.63-.77l2.96-13.94c.3-1.2-.46-1.74-1.33-1.33Z"
            fill="#ECF2EE"
          />
        </svg>
      );

    case 'signal':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8.2" stroke={accent} strokeWidth="1.6" strokeDasharray="3 2.5" />
          <path d="M12 6.4a5.6 5.6 0 0 0-4.8 8.5L6.5 17.6l2.8-.7a5.6 5.6 0 1 0 2.7-10.5Z" fill="#ECF2EE" />
        </svg>
      );

    case 'discord':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path
            d="M19.2 6.3a15 15 0 0 0-3.7-1.15l-.44.9a13.7 13.7 0 0 0-6.12 0l-.44-.9A15 15 0 0 0 4.8 6.3C2.45 9.8 1.8 13.2 2.12 16.56A15.2 15.2 0 0 0 6.66 18.8l.95-1.55a9.7 9.7 0 0 1-1.52-.73l.37-.28a10.7 10.7 0 0 0 11.08 0l.37.28c-.48.29-1 .53-1.52.73l.95 1.55a15.2 15.2 0 0 0 4.54-2.24c.38-3.9-.65-7.27-2.68-10.26Z"
            fill={accent}
            opacity="0.22"
            stroke={accent}
            strokeWidth="1.6"
          />
          <circle cx="9.2" cy="12.5" r="1.4" fill="#ECF2EE" />
          <circle cx="14.8" cy="12.5" r="1.4" fill="#ECF2EE" />
        </svg>
      );

    case 'snapchat':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path
            d="M12 3.8c-2.6 0-4.4 1.9-4.4 4.5v1.6c-.45.2-1.15.2-1.55.55-.3.26-.2.75.15.95.48.28 1.1.48 1.25.92-.35 1.7-1.95 3.1-3.35 3.6-.4.15-.55.58-.28.9.45.55 1.48.8 2.28.96.22.04.34.26.42.54.1.34.34.56.78.52.72-.07 1.42-.38 2.18-.14.78.24 1.52.8 2.52.8s1.74-.56 2.52-.8c.76-.24 1.46.07 2.18.14.44.04.68-.18.78-.52.08-.28.2-.5.42-.54.8-.16 1.83-.41 2.28-.96.27-.32.12-.75-.28-.9-1.4-.5-3-1.9-3.35-3.6.15-.44.77-.64 1.25-.92.35-.2.45-.69.15-.95-.4-.35-1.1-.35-1.55-.55V8.3c0-2.6-1.8-4.5-4.4-4.5Z"
            stroke="#ECF2EE"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path
            d="M4.5 4.5h3.7l4.3 5.9 5.1-5.9h1.9l-6.1 7.1 6.6 8.9h-3.7l-4.6-6.3-5.5 6.3H4.3l6.5-7.5L4.5 4.5Z"
            stroke="#ECF2EE"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'threads':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path
            d="M16.2 10.6c-.3-2.5-1.9-3.9-4.3-3.9-2.2 0-3.8 1.2-4.2 3.1m8.5.8c.2 2.4-.9 4.7-3.8 4.7-1.9 0-3.2-1-3.2-2.4 0-1.5 1.3-2.4 3.4-2.4 1.5 0 2.7.4 3.6 1.1m0-1c1.7.9 2.6 2.4 2.6 4.4 0 3.3-2.7 5.7-6.8 5.7-4.4 0-7.5-3.1-7.5-7.7s3.1-7.8 7.5-7.8c3.6 0 6.2 1.8 7 4.7"
            stroke="#ECF2EE"
            strokeWidth="1.85"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'reddit':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M12 8V4.5l3.2.8" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16.4" cy="5.5" r="1.3" fill={accent} />
          <ellipse cx="12" cy="14" rx="7.2" ry="5.2" stroke="#ECF2EE" strokeWidth="1.8" />
          <circle cx="9.3" cy="13.4" r="1.1" fill={accent} />
          <circle cx="14.7" cy="13.4" r="1.1" fill={accent} />
          <path d="M9.4 16.3c.8.6 1.7.9 2.6.9s1.8-.3 2.6-.9" stroke="#ECF2EE" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'pinterest':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke={accent} strokeWidth="1.8" />
          <path
            d="M10.4 17.5 11.7 12m-.5 2.1c.5.4 1.2.6 1.9.6 2.1 0 3.6-1.6 3.6-3.7 0-2-1.6-3.5-4-3.5-2.6 0-4.3 1.7-4.3 3.9 0 .9.3 1.6.9 2"
            stroke="#ECF2EE"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="3.5" stroke={accent} strokeWidth="1.8" />
          <path d="M8.2 10.6v5.2M8.2 7.8v.2M11.6 15.8v-5.2m0 1.8c.4-1.1 1.3-1.8 2.4-1.8 1.4 0 2.2.9 2.2 2.4v2.8" stroke="#ECF2EE" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );

    case 'youtube':
    case 'ytmusic':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <rect x="3" y="5.8" width="18" height="12.4" rx="4" stroke={accent} strokeWidth="1.9" />
          <path d="M10.3 9.4 15.5 12l-5.2 2.6V9.4Z" fill="#ECF2EE" />
        </svg>
      );

    case 'spotify':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke={accent} strokeWidth="1.8" />
          <path d="M7.6 9.7c3-.8 6.4-.6 9.1.7" stroke="#ECF2EE" strokeWidth="2" strokeLinecap="round" />
          <path d="M8.4 12.6c2.4-.6 5.2-.4 7.3.6" stroke="#ECF2EE" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9.3 15.3c1.8-.4 3.9-.2 5.4.5" stroke="#ECF2EE" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'netflix':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M7 19V5h2.6l4.8 10.6V5H17v14h-2.6L9.6 8.4V19H7Z" fill="#ECF2EE" />
          <path d="M7 5h2.6l4.8 14H17L12.2 5" fill={accent} opacity="0.55" />
        </svg>
      );

    case 'twitch':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M5 4h14v10l-3.8 3.5H12l-2.5 2.5H7.5v-2.5H5V4Z" stroke={accent} strokeWidth="1.9" strokeLinejoin="round" />
          <path d="M11 8v4M14.8 8v4" stroke="#ECF2EE" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'vlc':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M9.8 5h4.4l3.3 12H6.5L9.8 5Z" stroke="#ECF2EE" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8.5 10.2h7M7.4 14h9.2" stroke={accent} strokeWidth="1.8" />
          <path d="M4.5 18.5h15" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'shazam':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M14.5 9.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l.8-.8" stroke={accent} strokeWidth="2.1" strokeLinecap="round" />
          <path d="M9.5 14.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-.8.8" stroke="#ECF2EE" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );

    case 'soundcloud':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M4.5 15.5v-2M7 15.5v-4M9.5 15.5V9.8" stroke={accent} strokeWidth="1.9" strokeLinecap="round" />
          <path d="M12 15.5h5.2a2.6 2.6 0 0 0 .4-5.17A4.2 4.2 0 0 0 12 8.8v6.7Z" stroke="#ECF2EE" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );

    case 'capcut':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M5 7.5 13 12 5 16.5V7.5Z" stroke="#ECF2EE" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M19 7.5 11 12l8 4.5V7.5Z" stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );

    case 'canva':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8.2" stroke={accent} strokeWidth="1.8" />
          <path d="M15.2 9.4A4.2 4.2 0 1 0 15.2 14.6" stroke="#ECF2EE" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );

    case 'notion':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <rect x="5" y="4.5" width="14" height="15" rx="2.2" stroke={accent} strokeWidth="1.8" />
          <path d="M9 15.5v-7h1.6l3.4 4.8V8.5h1.5v7h-1.6l-3.4-4.8v4.8H9Z" fill="#ECF2EE" />
        </svg>
      );

    case 'chatgpt':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <circle cx="12" cy="12" r="2.2" fill={accent} />
          <path
            d="M12 4.5c2.2 0 3.8 1.5 3.8 3.6 0 1.4-.8 2.6-2 3.2m4.8-1.4c1.1 1.9.4 4.1-1.4 5.2-1.2.7-2.7.6-3.8-.1m3.7 3.5c-1.1 1.9-3.4 2.5-5.3 1.4-1.2-.7-1.9-2-1.9-3.3M12 19.5c-2.2 0-3.8-1.5-3.8-3.6 0-1.4.8-2.6 2-3.2m-4.8 1.4c-1.1-1.9-.4-4.1 1.4-5.2 1.2-.7 2.7-.6 3.8.1M6.9 5.5c1.1-1.9 3.4-2.5 5.3-1.4"
            stroke="#ECF2EE"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'gemini':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M12 3.2c1 4.8 3.9 7.8 8.8 8.8-4.9 1-7.8 4-8.8 8.8-1-4.8-3.9-7.8-8.8-8.8 4.9-1 7.8-4 8.8-8.8Z" stroke={accent} strokeWidth="1.8" fill="#ECF2EE" fillOpacity="0.15" />
        </svg>
      );

    case 'chrome':
    case 'brave':
    case 'firefox':
    case 'operagx':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8.2" stroke={accent} strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.4" stroke="#ECF2EE" strokeWidth="1.8" />
          <path d="M12 8.6h7.2M9.1 13.7 5.5 7.4M14.9 13.7l-3.6 6.3" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'protonvpn':
    case 'warp':
    case 'bitwarden':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M12 3.8 19 7v5.5c0 4.1-3 6.8-7 8-4-1.2-7-3.9-7-8V7l7-3.2Z" stroke={accent} strokeWidth="1.8" />
          <path d="m9.5 12.2 1.8 1.8 3.4-3.6" stroke="#ECF2EE" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'gmaps':
    case 'waze':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M12 20.5s6-5.7 6-10.3a6 6 0 1 0-12 0c0 4.6 6 10.3 6 10.3Z" stroke={accent} strokeWidth="1.8" />
          <circle cx="12" cy="10.2" r="2.2" fill="#ECF2EE" />
        </svg>
      );

    case 'github':
    case 'termux':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <rect x="3.5" y="4.5" width="17" height="15" rx="3" stroke={accent} strokeWidth="1.8" />
          <path d="m8 9.5 3 2.5-3 2.5M12.5 14.5H16" stroke="#ECF2EE" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'gmail':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke={accent} strokeWidth="1.8" />
          <path d="m4.5 7 7.5 5.8L19.5 7" stroke="#ECF2EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'steam':
    case 'psapp':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8.2" stroke={accent} strokeWidth="1.8" />
          <circle cx="14.5" cy="9.5" r="2.3" stroke="#ECF2EE" strokeWidth="1.8" />
          <path d="m5.5 14 4.3 1.7a2.2 2.2 0 0 0 2.7-1.1l1.5-3" stroke="#ECF2EE" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'pubg':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M6.5 11.5a5.5 5.5 0 0 1 11 0v5.2a1.8 1.8 0 0 1-1.8 1.8H8.3a1.8 1.8 0 0 1-1.8-1.8v-5.2Z" stroke="#ECF2EE" strokeWidth="1.8" />
          <path d="M8.5 11.5h7v3.2h-7v-3.2Z" fill={accent} opacity="0.3" stroke={accent} strokeWidth="1.5" />
          <path d="M12 3.5v2.5M4 13h2.5M17.5 13H20" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'codm':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M12 3.8 19 8v5.5c0 3.7-2.9 6.2-7 7.5-4.1-1.3-7-3.8-7-7.5V8l7-4.2Z" stroke={accent} strokeWidth="1.8" />
          <path d="M12 7.5 13.4 11H17l-2.9 2.1 1.1 3.4L12 14.4l-3.2 2.1 1.1-3.4L7 11h3.6L12 7.5Z" fill="#ECF2EE" />
        </svg>
      );

    case 'freefire':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path
            d="M12.5 3.5c.8 2.8-.6 4.7-2.1 6.4-1.2 1.3-2 2.7-2 4.4a4.6 4.6 0 0 0 9.2 0c0-2.8-2.2-5-2.7-7.7-.4 1.2-1.2 1.9-2.1 2.2.3-1.8-.1-3.6-.3-5.3Z"
            stroke="#ECF2EE"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12 12.5v5.5M10 15.5h4" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'fortnite':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M8 4.5h8.5v3.2h-4.8v3h4v3h-4v5.8H8V4.5Z" fill="#ECF2EE" />
          <path d="M16.5 4.5 19 6v13.5" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'brawlstars':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <circle cx="12" cy="11.5" r="6.5" stroke={accent} strokeWidth="1.8" />
          <path d="M9.5 11h1.5m2 0h1.5M9.5 15h5" stroke="#ECF2EE" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M12 3.2v1.8M5.2 6.8l1.4 1.1M18.8 6.8l-1.4 1.1" stroke={accent} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );

    case 'genshin':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M12 3 14.3 9.7 21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z" stroke="#ECF2EE" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2" fill={accent} />
        </svg>
      );

    case 'honkai':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="8.5" ry="3.8" transform="rotate(-25 12 12)" stroke={accent} strokeWidth="1.7" />
          <path d="M12 6.5 13.3 10.7 17.5 12l-4.2 1.3L12 17.5l-1.3-4.2L6.5 12l4.2-1.3L12 6.5Z" fill="#ECF2EE" />
        </svg>
      );

    case 'minecraft':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M12 3.5 19.5 7.8v8.4L12 20.5l-7.5-4.3V7.8L12 3.5Z" stroke="#ECF2EE" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M4.5 7.8 12 12l7.5-4.2M12 12v8.5" stroke={accent} strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );

    case 'roblox':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M7.2 4.2 19.8 7.5 16.5 20.1 3.9 16.8 7.2 4.2Z" stroke="#ECF2EE" strokeWidth="2" strokeLinejoin="round" />
          <rect x="10.4" y="10.4" width="3.2" height="3.2" transform="rotate(14 12 12)" fill={accent} />
        </svg>
      );

    case 'clashclans':
    case 'clashroyale':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M4.5 17.5h15l1-8.5-4.5 3-4-5.5-4 5.5-4.5-3 1 8.5Z" stroke="#ECF2EE" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="12" cy="13.5" r="1.4" fill={accent} />
        </svg>
      );

    case 'mlbb':
    case 'wildrift':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M12 3.5 17 12l-5 8.5L7 12l5-8.5Z" stroke="#ECF2EE" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M4 9l3.5 3L4 15M20 9l-3.5 3 3.5 3" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'asphalt':
    case 'rocketleague':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M5 17.5 12 6l7 11.5" stroke="#ECF2EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 17.5 12 11.5l3.5 6" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'fcmobile':
    case 'efootball':
    case 'dls':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="#ECF2EE" strokeWidth="1.8" />
          <path d="m12 8.2 3 2.2-1.1 3.6h-3.8L9 10.4l3-2.2Z" stroke={accent} strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );

    case 'subwaysurfers':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M15.5 6.5h-5.2a2.5 2.5 0 0 0 0 5h3.4a2.5 2.5 0 0 1 0 5H8.2" stroke="#ECF2EE" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M6 19.5h12" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'amongus':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M8.5 19.5V8.5a4.2 4.2 0 0 1 8.4 0v11h-2.6v-2.6h-3.2v2.6H8.5Z" stroke="#ECF2EE" strokeWidth="1.8" strokeLinejoin="round" />
          <rect x="11.2" y="7.5" width="6" height="3.6" rx="1.8" fill={accent} />
        </svg>
      );

    case 'geometrydash':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <rect x="4.5" y="4.5" width="15" height="15" rx="2.5" stroke="#ECF2EE" strokeWidth="1.8" />
          <rect x="8.2" y="8.5" width="2.4" height="2.4" fill={accent} />
          <rect x="13.4" y="8.5" width="2.4" height="2.4" fill={accent} />
          <path d="M8.2 14.5h7.6" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'chess':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <path d="M8 19h8m-7-3h6l-1-4.5 2.5-2.5-1.8-4-3.7 1.2L9.5 8l1.2 1.8L8 12.5V16Z" stroke="#ECF2EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12.5" cy="7.5" r="0.9" fill={accent} />
        </svg>
      );

    case '8ballpool':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="#ECF2EE" strokeWidth="1.8" />
          <circle cx="12" cy="10.5" r="3.4" stroke={accent} strokeWidth="1.6" />
          <circle cx="12" cy="9.6" r="0.7" fill="#ECF2EE" />
          <circle cx="12" cy="11.4" r="0.8" fill="#ECF2EE" />
        </svg>
      );

    default: {
      const words = title.replace(/[^A-Za-z0-9 ]/g, '').trim().split(/\s+/);
      const initials =
        words.length >= 2
          ? `${words[0][0]}${words[1][0]}`.toUpperCase()
          : title.slice(0, 2).toUpperCase();

      return (
        <svg viewBox="0 0 24 24" fill="none" className={svgClass} aria-hidden="true">
          <polygon
            points="12,3 19.8,7.5 19.8,16.5 12,21 4.2,16.5 4.2,7.5"
            stroke={accent}
            strokeWidth="1.5"
            opacity="0.78"
          />
          <text
            x="12"
            y="14.5"
            textAnchor="middle"
            fill="#ECF2EE"
            fontSize="8.2"
            fontWeight="700"
            fontFamily="Outfit, sans-serif"
            letterSpacing="0.03em"
          >
            {initials}
          </text>
        </svg>
      );
    }
  }
}

export function AppIcon({
  iconKey,
  title,
  accentColor,
  size = 'md',
  className = '',
}: AppIconProps) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 border border-white/[0.12] overflow-hidden select-none ${SIZE_MAP[size]} ${className}`}
      style={{
        background: `radial-gradient(circle at 25% 20%, ${accentColor}2A 0%, #141B16 55%, #080B09 100%)`,
      }}
    >
      {renderGlyph(iconKey, title, accentColor, ICON_SVG_SIZE[size])}
    </div>
  );
}
