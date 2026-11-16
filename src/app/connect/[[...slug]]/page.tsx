import type { Metadata } from 'next';
import React from 'react';
import { ConnectApp } from '@/connect/ConnectApp';

const title = 'Motion Dojo Connect';
const description =
  'Meet the Keyframe Ninjas, students of Black Belt in Motion Design. See their work, follow their progress and connect with smartphone motion designers.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: 'https://connect.joinmotiondojo.com' },
  twitter: { title, description },
};

export default function ConnectPage() {
  return <ConnectApp />;
}
