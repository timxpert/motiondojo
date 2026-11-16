import type { Metadata } from 'next';
import React from 'react';
import { ConnectApp } from '@/connect/ConnectApp';

const title = 'Motion Dojo Connect';
const description =
  'Profiles and work from the Keyframe Ninjas, the students of Black Belt in Motion Design.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: 'https://connect.joinmotiondojo.com' },
  twitter: { title, description },
};

export default function ConnectPage() {
  return <ConnectApp />;
}
