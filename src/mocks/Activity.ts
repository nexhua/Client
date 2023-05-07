import {
  type Activity,
  type PhysicalActivity,
} from '../interfaces/PhysicalActivity';

const Activities: Activity[] = [
  {
    code: 12010,
    description:
      'jog/walk combination (jogging component of less than 10 minutes) (Taylor Code 180)',
    met: 6.0,
  },
  {
    code: 12020,
    description: 'jogging, general',
    met: 7.0,
  },
  {
    code: 12025,
    description: 'jogging, in place',
    met: 8.0,
  },
  {
    code: 12027,
    description: 'jogging, on a mini-tramp',
    met: 4.5,
  },
  {
    code: 12029,
    description: 'running, 4 mph (15 min/mile)',
    met: 6.0,
  },
];

export const running: PhysicalActivity = {
  name: 'Running',
  activities: Activities,
};
