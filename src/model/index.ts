export type EntityType = 'project' | 'company' | 'customer' | 'invoice';

export interface IEntity {
    loading: boolean;
    error: string;
    data: Object;
    item: Object;
}

import { Project } from './project';


export const createNew = (path: EntityType) => {
    switch (path) {
        case 'project':
            return Object.assign({}, Project);
    }
    return null;
};