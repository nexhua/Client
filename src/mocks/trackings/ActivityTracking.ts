import {type ActivityTracking} from '../../interfaces/health/trackings/ActivityTracking';

export const activityTrackings: ActivityTracking[] = [
  {
    id: 0,
    activityId: 0,
    personId: 15,
    calories: null,
    duration: 30,
    createdAt: new Date(),
    date: new Date('Wed May 15 2023 19:04:04 GMT+0300 (GMT+03:00)'),
  },
  {
    id: 1,
    activityId: 1,
    personId: 15,
    calories: null,
    duration: 50,
    createdAt: new Date(),
    date: new Date('Wed May 16 2023 19:04:04 GMT+0300 (GMT+03:00)'),
  },
  {
    id: 2,
    activityId: null,
    personId: 15,
    calories: 600,
    duration: 0,
    createdAt: new Date(),
    date: new Date(),
  },
];
