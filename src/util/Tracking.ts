import {type ActivityTracking} from '../interfaces/health/trackings/ActivityTracking';
import {isToday} from './Time';
import {activities} from '../mocks/Activity';
import {
  type FoodTracking,
  type FoodTrackingNutrient,
} from '../interfaces/health/trackings/FoodTracking';
import {type Nutrient} from '../interfaces/nutrition/Nutrient';
import {type Units} from '../interfaces/mealkit/Units';

interface TrackingDate {
  date: Date;
}

export function todayOrLatest<T extends TrackingDate>(
  trackings: T[],
): T | null {
  const todaysTracking = trackings.filter(tracking => isToday(tracking.date));

  if (todaysTracking.length > 0) {
    return todaysTracking.slice(-1)[0];
  } else {
    if (trackings.length === 0) {
      return null;
    }

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

export function todayAll<T extends TrackingDate>(trackings: T[]): T[] {
  return trackings.filter(tracking => isToday(tracking.date));
}

export function getFoodTrackingCalorie(
  tracking: FoodTracking,
  foodTrackingNutrients: FoodTrackingNutrient[],
  nutrients: Nutrient[],
  units: Units[],
): number {
  const trackingNutrients = foodTrackingNutrients.filter(
    trackingNutrients => trackingNutrients.trackingId === tracking.id,
  );

  const nutrient = nutrients.find(
    n => n.name === 'Energy' || n.name === 'Calories',
  );

  if (nutrient !== undefined) {
    const energyTrackings = trackingNutrients.filter(
      t => t.nutrientId === nutrient.id,
    );

    return energyTrackings.reduce((prev, cur) => prev + cur.amount, 0);
  }

  return 0;
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

// MET Calculator
export function calculateActivityCalorie(
  met: number,
  duration: number,
  weight: number,
): number {
  const hour = duration / 60.0;
  return met * hour * weight;
}
