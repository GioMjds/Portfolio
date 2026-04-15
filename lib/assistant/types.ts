export type AssistantRole = 'user' | 'assistant';

export type AssistantSection =
  | 'identity'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'services'
  | 'homepage';

export type AssistantConfidence = 'high' | 'medium' | 'low';

export type AssistantSafetyFlag =
  | 'low_context_confidence'
  | 'out_of_scope_refusal'
  | 'provider_fallback'
  | 'missing_api_key'
  | 'rate_limited';

export interface AssistantChatMessage {
  role: AssistantRole;
  content: string;
}

export interface AssistantChatRequest {
  message: string;
  route?: string;
  history?: AssistantChatMessage[];
}

export interface AssistantChatResponse {
  answer: string;
  usedSections: AssistantSection[];
  safetyFlags: AssistantSafetyFlag[];
}

export type AssistantStreamEventType = 'chunk' | 'meta' | 'done' | 'error';

export interface AssistantStreamChunkEvent {
  type: 'chunk';
  delta: string;
}

export interface AssistantStreamMetaEvent {
  type: 'meta';
  usedSections: AssistantSection[];
  safetyFlags: AssistantSafetyFlag[];
}

export interface AssistantStreamDoneEvent {
  type: 'done';
}

export interface AssistantStreamErrorEvent {
  type: 'error';
  message: string;
}

export type AssistantStreamEvent =
  | AssistantStreamChunkEvent
  | AssistantStreamMetaEvent
  | AssistantStreamDoneEvent
  | AssistantStreamErrorEvent;

export interface KnowledgeSlice {
  id: string;
  section: AssistantSection;
  title: string;
  content: string;
  keywords: string[];
}

export interface PortfolioKnowledge {
  slices: KnowledgeSlice[];
}

export interface RelevanceResult {
  slices: KnowledgeSlice[];
  usedSections: AssistantSection[];
  confidence: AssistantConfidence;
  totalKeywordMatches: number;
}
