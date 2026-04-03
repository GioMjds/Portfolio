'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Certificate } from '@/constants';

interface CertificateCardProps {
  certificate: Certificate;
  onPreview: (certificate: Certificate) => void;
}

export function CertificateCard({
  certificate,
  onPreview,
}: CertificateCardProps) {
  const [imageUnavailable, setImageUnavailable] = useState<boolean>(false);

  return (
    <Card className="h-full border-border/60 bg-card/80 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="space-y-3">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg border border-border/60 bg-muted/40">
          {imageUnavailable ? (
            <div className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
              <ImageOff className="size-4" />
              Preview unavailable
            </div>
          ) : (
            <Image
              src={certificate.path}
              alt={`${certificate.name} certificate`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
              onError={() => setImageUnavailable(true)}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{certificate.issuer}</Badge>
          <Badge variant="secondary">{certificate.year}</Badge>
          {certificate.featured && <Badge>Featured</Badge>}
        </div>
        <CardTitle className="text-base leading-snug">{certificate.name}</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto space-y-4">
        <p className="text-sm text-muted-foreground">
          Category:{' '}
          {certificate.category.charAt(0).toUpperCase() +
            certificate.category.slice(1)}
        </p>
        {certificate.icons && certificate.icons.length > 0 && (
          <ul className="flex flex-wrap gap-2" role="list" aria-label="Certificate technologies">
            {certificate.icons.map((icon) => (
              <li
                key={icon}
                className="relative size-7 rounded-md border border-border/50 bg-background/60 p-1"
              >
                <Image
                  src={icon}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="28px"
                  className="object-contain p-1"
                />
              </li>
            ))}
          </ul>
        )}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => onPreview(certificate)}
        >
          Preview certificate
        </Button>
      </CardContent>
    </Card>
  );
}
