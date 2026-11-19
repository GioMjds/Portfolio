'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Manila',
  hour: 'numeric',
  minute: '2-digit',
});

/**
 * Live clock in Philippine time. Renders a fixed-width placeholder until the
 * client takes over, so there is no hydration mismatch or layout jump.
 */
export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 15_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <time
      dateTime={now?.toISOString()}
      className="inline-block min-w-[7ch] tabular-nums"
    >
      {now ? formatter.format(now) : '--:-- --'}
    </time>
  );
}
