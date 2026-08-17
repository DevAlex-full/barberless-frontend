import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { SkipLink } from '@/components/layout/SkipLink';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BarberLess',
    template: '%s · BarberLess',
  },
  description: 'Plataforma digital da BarberLess: agendamento, clube de fidelidade e muito mais.',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F5EE' },
    { media: '(prefers-color-scheme: dark)', color: '#17140F' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <SkipLink />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
