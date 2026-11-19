/**
 * Page-enter transition. Remounts when the top-level route segment changes
 * (e.g. / → /projects), not for deeper navigations such as
 * /projects → /projects/[projectID].
 *
 * Stays a Server Component: the animation is pure CSS (tw-animate-css), so it
 * needs no hydration and is skipped entirely under prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 ease-out motion-reduce:animate-none">
      {children}
    </div>
  );
}
