'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import type { Certificate } from '@/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CertificatePreviewDialogProps {
  certificate: Certificate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CertificatePreviewDialog({
  certificate,
  open,
  onOpenChange,
}: CertificatePreviewDialogProps) {
  const [failedImagePath, setFailedImagePath] = useState<string | null>(null);

  if (!certificate) return null;

  const imageUnavailable = failedImagePath === certificate.path;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 sm:max-w-4xl" showCloseButton>
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-muted">
          {imageUnavailable ? (
            <div className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
              <ImageOff className="size-4" />
              Unable to load certificate preview
            </div>
          ) : (
            <Image
              src={certificate.path}
              alt={`${certificate.name} certificate by ${certificate.issuer}`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain p-2"
              onError={() => setFailedImagePath(certificate.path)}
            />
          )}
        </div>
        <DialogHeader className="px-6 pb-6">
          <DialogTitle className="text-lg">{certificate.name}</DialogTitle>
          <DialogDescription>
            {certificate.issuer} • {certificate.year} •{' '}
            {certificate.category.charAt(0).toUpperCase() +
              certificate.category.slice(1)}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
