import type { Preset } from 'unocss'

export function iconAnimationPreset(): Preset {
  return {
    name: 'unocss-icon-animation-preset',
    preflights: [
      {
        getCSS: () => `
          @keyframes pop-in { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); } }
          @keyframes spin-fade-in { 0% { transform: rotate(-360deg) scale(0); opacity: 0; } 75% { transform: rotate(25deg); } }
          @keyframes sway-pulse { 0% { opacity: 0; } 25% { transform: rotate(25deg); } 50% { transform: rotate(-20deg) scale(1.2); } 75% { transform: rotate(15deg); } }
          @keyframes spin-fade { 0% { transform: rotate(0deg) scale(0); opacity: 0; } 50% { transform: rotate(-10deg) scale(1.2); } }
        `,
      },
    ],
    rules: [
      [
        'animate-pop-in',
        {
          'animation-name': 'pop-in',
          'animation-duration': 'var(--un-animate-duration)',
          '--un-animate-duration': '500ms',
        },
      ],
      [
        'animate-spin-fade-in',
        {
          'animation-name': 'spin-fade-in',
          'animation-duration': 'var(--un-animate-duration)',
          '--un-animate-duration': '500ms',
        },
      ],
      [
        'animate-sway-pulse',
        {
          'animation-name': 'sway-pulse',
          'animation-duration': 'var(--un-animate-duration)',
          '--un-animate-duration': '500ms',
        },
      ],
      [
        'animate-spin-fade',
        {
          'animation-name': 'sway-pulse',
          'animation-duration': 'var(--un-animate-duration)',
          '--un-animate-duration': '500ms',
        },
      ],
    ],
  }
}
