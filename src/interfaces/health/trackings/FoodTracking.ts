// Table: health.foodTrackings
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=foodTrackings&schema=health&view=table_structure

export interface FoodTracking {
  id: number;
  foodId: number | null;
  personId: number;
  computedUnitId: 'g' | 'ml'; // Hesaplanmiş miktarin birimi (g yada ml). Flags: private.
  computedValue: number; // Hesaplanmiş miktar.
  createdAt: Date;
  date: Date;
  foodName: string;
  meal: MealTypes;
  unitId: number; // Kullanicinin girdiği miktarin birimi. Flags: private.
  value: number; // Kullanicinin girdiği miktar.
}

// Table: health.foodTrackingNutrients
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=foodTrackingNutrients&schema=health&view=table_structure
// Ref Nutrient is same with mealkit.nutrient

export interface FoodTrackingNutrient {
  id: number;
  nutrientId: number;
  trackingId: number;
  amount: number;
}

export type MealTypes =
  | 'breakfast'
  | 'morningSnack'
  | 'lunch'
  | 'afternoonSnack'
  | 'eveningSnack'
  | 'dinner';
