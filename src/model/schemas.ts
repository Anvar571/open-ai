import { z } from 'zod';

export const createCollectionSChema = z.object({
  name: z.string({ required_error: 'Collection name is required' }),
});

export const addDataToCollection = z.object({
  collectionName: z.string({ required_error: 'Collection name is required' }),
  message: z.string({ required_error: 'Message is required' }),
  id: z.number({ required_error: 'id is required' }),
});

export const askQuestionSchema = z.object({
  message: z.string({ required_error: 'Message is required' }),
});
