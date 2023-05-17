import {type ActivityTracking} from '../interfaces/health/trackings/ActivityTracking';
import {isToday} from './Time';
import {activities} from '../mocks/trackings/Activity';

interface TrackingDate {
  date: Date;
}

export function todayOrLatest<T extends TrackingDate>(trackings: T[]): T {
  const todaysTracking = trackings.find(tracking => isToday(tracking.date));

  if (todaysTracking !== undefined) {
    return todaysTracking;
  } else {
    const latestTracking = trackings.reduce((prev, cur) =>
      prev.date > cur.date ? prev : cur,
    );

    return latestTracking;
  }
}

export function today<T extends TrackingDate>(trackings: T[]): T | null {
  const todaysTracking = trackings.find(tracking => isToday(tracking.date));

  if (todaysTracking !== undefined) {
    return todaysTracking;
  } else {
    return null;
  }
}

export function calorieHelper(
  tracking: ActivityTracking | null,
  weight: number,
): number {
  if (tracking !== null) {
    if (tracking.calories !== null) {
      return tracking.calories;
    } else {
      if (tracking.activityId !== null) {
        const foundActivity = activities.find(
          act => act.id === tracking.activityId,
        );

        if (foundActivity !== undefined) {
          return calculateActivityCalorie(
            foundActivity.metRatio,
            tracking.duration,
            weight,
          );
        }
        return 5 * tracking.duration;
      } else {
        return 0.0;
      }
    }
  }

  return 0.0;
}

export function calculateActivityCalorie(
  met: number,
  duration: number,
  weight: number,
): number {
  const hour = duration / 60.0;
  return met * hour * weight;
}
