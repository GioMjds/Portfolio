'use client';

import { getImageProps } from 'next/image';
import { Images } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  ImageViewer,
  ImageViewerCaption,
  ImageViewerClose,
  ImageViewerContent,
  ImageViewerCounter,
  ImageViewerGallery,
  ImageViewerNext,
  ImageViewerPrevious,
  ImageViewerThumbnail,
  type LightboxImage,
} from '@/components/motion/morphing-lightbox';
import { cn } from '@/lib/utils';
import type { ProjectGallery as Gallery } from '@/constants';

interface ProjectGalleryProps {
  projectName: string;
  gallery: Gallery;
}

/** Optimized URL for a local image at (roughly) the given display width. */
function optimizedSrc(src: string, width: number, height: number) {
  return getImageProps({ src, alt: '', width, height, quality: 75 }).props.src;
}

/**
 * Screenshot grid that morphs into a full-screen viewer. Thumbnails and the
 * full view both go through the Next image optimizer, so a 14-image set
 * doesn't ship megabytes of PNG.
 */
export function ProjectGallery({ projectName, gallery }: ProjectGalleryProps) {
  const { width, height } = gallery;
  const isPortrait = height > width;
  const total = gallery.images.length;

  // CSS display widths. getImageProps requests 2x, so the full view lands on
  // the source resolution (1920 / 1080) instead of an upscale-sized request.
  const thumbWidth = isPortrait ? 240 : 480;
  const fullWidth = Math.round(width / 2);

  const images: LightboxImage[] = gallery.images.map((src, i) => ({
    id: String(i + 1),
    src: optimizedSrc(src, fullWidth, Math.round((fullWidth * height) / width)),
    thumbSrc: optimizedSrc(
      src,
      thumbWidth,
      Math.round((thumbWidth * height) / width),
    ),
    alt: `${projectName} screenshot ${i + 1} of ${total}`,
    width,
    height,
  }));

  return (
    <Card
      className="border-border/50 bg-card"
      aria-labelledby="project-gallery-heading"
    >
      <CardContent className="p-6">
        <h2
          id="project-gallery-heading"
          className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold"
        >
          <Images className="size-6 text-primary" />
          Screenshots
        </h2>
        <ImageViewer images={images} label={`${projectName} screenshots`}>
          <ImageViewerGallery
            className={cn(
              'gap-2 sm:gap-3',
              isPortrait
                ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5'
                : 'grid-cols-2 sm:grid-cols-3',
            )}
          >
            {images.map((image) => (
              <ImageViewerThumbnail
                key={image.id}
                imageId={image.id}
                className="rounded-lg"
              />
            ))}
          </ImageViewerGallery>
          <ImageViewerContent
            header={
              <>
                <ImageViewerCounter />
                <ImageViewerClose />
              </>
            }
          >
            <ImageViewerPrevious />
            <ImageViewerCaption />
            <ImageViewerNext />
          </ImageViewerContent>
        </ImageViewer>
      </CardContent>
    </Card>
  );
}
