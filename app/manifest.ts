import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gio Majadas | Personal Portfolio',
    short_name: 'GioMjds',
    description:
      "Gio Majadas' personal portfolio website showcasing projects, skills, and contact information.",
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#05050d',
    theme_color: '#05050d',
    lang: 'en-US',
    categories: ['personal', 'portfolio', 'developer'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
    ],
  };
}
