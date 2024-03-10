import { writable } from 'svelte/store';

// Define a custom type for the filter values
type Filter = 'all' | 'isDeleted' | 'starred' | 'isArchived';

// Create the writable store with the custom type
export const filter = writable<Filter>('all');
