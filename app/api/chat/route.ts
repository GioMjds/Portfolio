import { handleAssistantChatPost } from '@/lib/assistant/route-handler';

export async function POST(req: Request) {
  return handleAssistantChatPost(req);
}

