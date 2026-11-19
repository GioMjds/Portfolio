import type { Metadata } from 'next';
import { NotFoundView } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return <NotFoundView />;
}
