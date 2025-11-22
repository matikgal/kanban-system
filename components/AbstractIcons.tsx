
import React from 'react';

interface IconProps {
  variant: 'add' | 'delete' | 'edit' | 'close' | 'search' | 'drag' | 'calendar' | 'check' | 'logo' | 'sun' | 'moon' | 'tag' | 'trash_col' | 'arrow_left' | 'arrow_right' | 'layers' | 'clock' | 'play' | 'pause' | 'history' | 'user' | 'eye_off' | 'eye_on';
  className?: string;
  size?: number;
}

export const AbstractIcon: React.FC<IconProps> = ({ variant, className = "", size = 24 }) => {
  const strokeColor = "currentColor";
  const strokeWidth = 1.5; 

  const paths = {
    add: (
      <>
        <path d="M12 4V20" stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M4 12H20" stroke={strokeColor} strokeWidth={strokeWidth} />
      </>
    ),
    delete: (
      <>
        <path d="M3 6H21" stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M19 6V21H5V6" stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M10 11V16" stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M14 11V16" stroke={strokeColor} strokeWidth={strokeWidth} />
      </>
    ),
    edit: (
      <polygon points="16 3 21 8 8 21 3 21 3 16 16 3" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
    ),
    close: (
      <>
        <path d="M18 6L6 18" stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M6 6L18 18" stroke={strokeColor} strokeWidth={strokeWidth} />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" stroke={strokeColor} strokeWidth={strokeWidth} />
        <path d="M21 21L16.65 16.65" stroke={strokeColor} strokeWidth={strokeWidth} />
      </>
    ),
    drag: (
      <>
        <circle cx="9" cy="12" r="1" fill={strokeColor} />
        <circle cx="15" cy="12" r="1" fill={strokeColor} />
        <circle cx="9" cy="6" r="1" fill={strokeColor} />
        <circle cx="15" cy="6" r="1" fill={strokeColor} />
        <circle cx="9" cy="18" r="1" fill={strokeColor} />
        <circle cx="15" cy="18" r="1" fill={strokeColor} />
      </>
    ),
    calendar: (
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={strokeColor} strokeWidth={strokeWidth} />
    ),
    check: (
      <polyline points="20 6 9 17 4 12" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
    ),
    logo: (
        <>
            <rect x="3" y="3" width="18" height="18" stroke={strokeColor} strokeWidth={strokeWidth} />
            <line x1="9" y1="3" x2="9" y2="21" stroke={strokeColor} strokeWidth={strokeWidth} />
            <line x1="9" y1="12" x2="21" y2="12" stroke={strokeColor} strokeWidth={strokeWidth} />
            <rect x="13" y="6" width="4" height="4" fill={strokeColor} strokeWidth="0" opacity="0.3" />
        </>
    ),
    moon: (
         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke={strokeColor} strokeWidth={strokeWidth} fill="none"/>
    ),
    sun: (
         <>
             <circle cx="12" cy="12" r="5" stroke={strokeColor} strokeWidth={strokeWidth} />
             <path d="M12 1V3" stroke={strokeColor} strokeWidth={strokeWidth} />
             <path d="M12 21V23" stroke={strokeColor} strokeWidth={strokeWidth} />
             <path d="M4.22 4.22L5.64 5.64" stroke={strokeColor} strokeWidth={strokeWidth} />
             <path d="M18.36 18.36L19.78 19.78" stroke={strokeColor} strokeWidth={strokeWidth} />
             <path d="M1 12H3" stroke={strokeColor} strokeWidth={strokeWidth} />
             <path d="M21 12H23" stroke={strokeColor} strokeWidth={strokeWidth} />
             <path d="M4.22 19.78L5.64 18.36" stroke={strokeColor} strokeWidth={strokeWidth} />
             <path d="M18.36 5.64L19.78 4.22" stroke={strokeColor} strokeWidth={strokeWidth} />
         </>
    ),
    tag: (
        <path d="M20.59 13.41L13.42 20.58C12.79 21.21 11.77 21.21 11.14 20.58L2.46 11.9C2.17 11.61 2 11.2 2 10.79V4C2 2.9 2.9 2 4 2H10.79C11.2 2 11.61 2.17 11.9 2.46L20.59 11.14C21.21 11.77 21.21 12.79 20.59 13.41Z" stroke={strokeColor} strokeWidth={strokeWidth} fill="none"/>
    ),
    trash_col: (
        <>
            <polyline points="3 6 5 6 21 6" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M19 6V21H5V6" stroke={strokeColor} strokeWidth={strokeWidth} />
        </>
    ),
    arrow_left: (
        <polyline points="15 18 9 12 15 6" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
    ),
    arrow_right: (
        <polyline points="9 18 15 12 9 6" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
    ),
    layers: (
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={strokeColor} strokeWidth={strokeWidth} />
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="10" stroke={strokeColor} strokeWidth={strokeWidth} />
            <polyline points="12 6 12 12 16 14" stroke={strokeColor} strokeWidth={strokeWidth} />
        </>
    ),
    play: (
        <polygon points="5 3 19 12 5 21 5 3" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
    ),
    pause: (
        <>
            <rect x="6" y="4" width="4" height="16" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
            <rect x="14" y="4" width="4" height="16" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
        </>
    ),
    history: (
        <>
             <path d="M12 8v4l3 3" stroke={strokeColor} strokeWidth={strokeWidth} />
             <path d="M3.05 11a9 9 0 1 1 .5 9m-.5-9v-5h5" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
        </>
    ),
    user: (
        <>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={strokeColor} strokeWidth={strokeWidth} />
            <circle cx="12" cy="7" r="4" stroke={strokeColor} strokeWidth={strokeWidth} />
        </>
    ),
    eye_off: (
        <>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
            <line x1="1" y1="1" x2="23" y2="23" stroke={strokeColor} strokeWidth={strokeWidth} />
        </>
    ),
    eye_on: (
        <>
             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={strokeColor} strokeWidth={strokeWidth} fill="none"/>
             <circle cx="12" cy="12" r="3" stroke={strokeColor} strokeWidth={strokeWidth} />
        </>
    )
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {paths[variant]}
    </svg>
  );
};
