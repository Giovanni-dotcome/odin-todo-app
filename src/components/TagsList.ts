import ITag from "../interfaces/ITag";

import { v4 } from 'uuid';

const TagsList: ITag[] = [
    {
        id: v4(),
        name: 'Work',
        color: '#FF5733', // Bold orange for work
    },
    {
        id: v4(),
        name: 'Personal',
        color: '#33FF57', // Refreshing green for personal tasks
    },
    {
        id: v4(),
        name: 'Shopping',
        color: '#FFCC00', // Bright yellow for shopping tasks
    },
    {
        id: v4(),
        name: 'Fitness',
        color: '#33A1FF', // Cool blue for fitness-related tasks
    },
    {
        id: v4(),
        name: 'Study',
        color: '#9B59B6', // Calming purple for study tasks
    },
    {
        id: v4(),
        name: 'Maintenance',
        color: '#F39C12', // Warm amber for maintenance tasks
    }
];

export default TagsList;
