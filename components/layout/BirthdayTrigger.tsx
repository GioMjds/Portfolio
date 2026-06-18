'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { isBirthdayToday } from '@/lib/birthday';

export function BirthdayTrigger() {
  useEffect(() => {
    if (isBirthdayToday()) {
      const hasCelebrated = sessionStorage.getItem('birthday_celebrated');

      if (!hasCelebrated) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FF69B4', '#00BFFF', '#ADFF2F', '#FF4500'],
        });

        sessionStorage.setItem('birthday_celebrated', 'true');
      }
    }
  }, []);

  return null; // This component only handles the effect
}
