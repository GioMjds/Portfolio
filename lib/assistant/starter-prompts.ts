/**
 * Context-aware starter prompts, keyed by route.
 *
 * Shared by ChatPanel and the homepage hero so both always show the same
 * wording. Routes: `/projects*`, `/about`, `/certificates`, and a default
 * (homepage and everything else).
 */
export function getStarterPrompts(pathname: string): string[] {
  if (pathname.startsWith('/projects')) {
    return [
      'Which project best shows full-stack experience?',
      'What technologies were used across the projects?',
      'Can you summarize the Commitly project?',
    ];
  }

  if (pathname === '/about') {
    return [
      'Who is Gio Majadas?',
      'What are Gio’s strongest technical skills?',
      'What services does Gio offer?',
    ];
  }

  if (pathname === '/certificates') {
    return [
      'What certifications are showcased here?',
      'Which certificates relate to backend development?',
      'Any certification related to cybersecurity?',
    ];
  }

  return [
    'Who is Gio Majadas?',
    'What are the highlighted skills?',
    'Which projects are best to review first?',
  ];
}
