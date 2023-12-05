'use client';
import type { Metadata } from 'next';
import { Audiowide, Inter, Lunasima, Michroma } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/utils/Providers/Providers';
import AudioComponent from '@/components/AudioComponent';
import { lucida } from '@/utils/Fonts';
const michroma = Michroma({
  subsets: ['latin'],
  weight: '400',
});
const aw = Audiowide({
  variable: '--Font-audiowide',
  subsets: ['latin'],
  weight: '400',
});

// export const metadata: Metadata = {
//   title: "",
//   description: "The 1969 moon landing, NASA's Apollo 11 mission",
//   icons:{
//     icon
//   }
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${aw.variable} ${lucida.variable} overflow-y-hidden bg-neutral-950 text-neutral-50 scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-400 scrollbar-thumb-rounded-full `}
    >
      <head>
        {/* <!-- HTML Meta Tags --> */}
        <title key='title'>Apollo 11</title>
        <meta name='viewport' content='width=device-width, user-scalable=no' />
        <meta
          name='description'
          content="The 1969 moon landing, NASA's Apollo 11 mission"
        />
        <link
          rel='icon'
          href='/Images/White Logo.png'
          type='image/png'
          sizes='16x16'
        />
      </head>

      <body className={`relative ${michroma.className}`}>
        <Providers>
          {/* Audio */}
          <AudioComponent />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
