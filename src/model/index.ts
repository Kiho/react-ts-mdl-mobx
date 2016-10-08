export type EntityType = 'project' | 'company' | 'customer' | 'invoice';

export interface IEntity {
    loading: boolean;
    error: string;
    data: Object;
    item: Object;
}

export * from './project';