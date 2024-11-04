export interface Issue {
    id?: string; // Optional because it may not exist before creation
    title: string;
    description: string;
    status: 'open' | 'closed' | 'in-progress';
    priority?: 'low' | 'medium' | 'high';
    createdAt?: string;
    updatedAt?: string;
  }
  