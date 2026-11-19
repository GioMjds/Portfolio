import { NotFoundTerminal } from '@/components/motion/not-found/terminal';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <NotFoundTerminal
        cwd="~/giomjds"
        path="/projects/unknown"
        title="Project not found"
        description="This project link has gone missing. It may have been moved, renamed, or it never existed."
        homeHref="/projects"
        homeLabel="Back to Projects"
        browseHref="/"
        browseLabel="Go Home"
        labels={{
          terminalError: 'cd: no such file or directory: /projects/unknown',
        }}
      />
    </div>
  );
}
