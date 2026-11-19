'use client';

import { usePathname } from 'next/navigation';
import { NotFoundTerminal } from '@/components/motion/not-found/terminal';
import { useMounted } from '@/lib/hooks/use-mounted';

/**
 * Site-wide 404 body. Unknown project IDs are rejected at routing time
 * (dynamicParams = false), so this root view also covers /projects/<id>.
 *
 * The 404 page is prerendered once, so the real URL is only known on the
 * client. Render the generic version until mounted to match that HTML (no
 * hydration mismatch), then show the requested path.
 */
export function NotFoundView() {
  const mounted = useMounted();
  const realPath = usePathname() || '/';
  const pathname = mounted ? realPath : '/page';
  const isProject = mounted && realPath.startsWith('/projects/');

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <NotFoundTerminal
        cwd="~/giomjds"
        path={pathname}
        title={isProject ? 'Project not found' : 'Page not found'}
        description={
          isProject
            ? 'This project link has gone missing. It may have been moved, renamed, or it never existed.'
            : 'The page you are looking for moved, vanished, or never existed.'
        }
        homeHref={isProject ? '/projects' : '/'}
        homeLabel={isProject ? 'Back to Projects' : 'Back home'}
        browseHref={isProject ? '/' : '/projects'}
        browseLabel={isProject ? 'Go Home' : 'Browse projects'}
        labels={{
          terminalError: `cd: no such file or directory: ${pathname}`,
        }}
      />
    </div>
  );
}
