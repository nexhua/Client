import {
  type ActivityCategory,
  type Activity,
} from '../interfaces/health/Activity';

export const activityCategories: ActivityCategory[] = [
  {
    id: 57,
    name: 'Running',
    code: '12',
  },
  {
    id: 58,
    name: 'Water Activities',
    code: '18',
  },
];

export const activities: Activity[] = [
  {
    id: 0,
    categoryId: 12,
    code: 12010,
    name: 'jog/walk combination (jogging component of less than 10 minutes) (Taylor Code 180)',
    metRatio: 6.0,
  },
  {
    id: 1,
    categoryId: 12,
    code: 12020,
    name: 'jogging, general',
    metRatio: 7.0,
  },
  {
    id: 2,
    categoryId: 12,
    code: 12025,
    name: 'jogging, in place',
    metRatio: 8.0,
  },
  {
    id: 3,
    categoryId: 12,
    code: 12027,
    name: 'jogging, on a mini-tramp',
    metRatio: 4.5,
  },
  {
    id: 4,
    categoryId: 12,
    code: 12029,
    name: 'running, 4 mph (15 min/mile)',
    metRatio: 6.0,
  },
];
