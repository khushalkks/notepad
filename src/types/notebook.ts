export interface Note {
  id: string;
  title: string;
  content: string;
  documentId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Notebook {
  id: string;
  title: string;
  documentIds: string[];
  notes: Note[];
  createdAt: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
