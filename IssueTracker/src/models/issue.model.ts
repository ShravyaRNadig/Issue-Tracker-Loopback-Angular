import {Entity, model, property} from '@loopback/repository';

@model()
export class Issue extends Entity {
  @property({
    type: 'number',
    id: true, // This marks the property as the primary key
  })
  id?: number; // Optional, will be generated automatically

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['open', 'closed', 'in-progress'],
    },
  })
  status: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['low', 'medium', 'high'],
    },
  })
  priority?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updatedAt?: string;

  constructor(data?: Partial<Issue>) {
    super(data);
  }
}


export interface IssueRelations {
  // describe navigational properties here
}

export type IssueWithRelations = Issue & IssueRelations;
