// Table: health.persons
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=persons&schema=health&view=table_structure

export interface Person {
  id: number;
  userId: number;
  createdAt: Date;
  index: number | null;
  isOwnedByUser: boolean;
  name: string;
  photoUrl: string | null;
  activityIntensity: 'sedentary' | 'low' | 'moderate' | 'high';
  birthDate: Date;
  diet: string | null;
  gender: 'm' | 'f';
  height: number; // Unit: cm.
  menopauseDate: Date | null;
  menstrualCycleDays: number | null;
  pregnancyDueDate: Date | null;
  mainGoal: MainGoals;
  activityGoal: number; // Unit: cal/day.
  calorieGoal: number; // Unit: cal/day.
  stepsGoal: number; // Unit: steps/day.
  weightGoal: number | null; // Unit: kg.
  weightPaceGoal: number | null; // Unit: kg/week.
  macroBudgetId: number | null;
  customCarbRatio: number | null; // Custom macro ratio to calorieGoal. Unit: % (Between 0 and 1).
  customFatRatio: number | null; // Custom macro ratio to calorieGoal. Unit: % (Between 0 and 1).
  customProteinRatio: number | null; // Custom macro ratio to calorieGoal. Unit: % (Between 0 and 1).
  customFibreBudget: number | null; // Unit: g.
  breakfastRatio: number; // Custom macro ratio to calorieGoal. Unit: % (Between 0 and 1).
  morningSnackRatio: number; // Custom macro ratio to calorieGoal. Unit: % (Between 0 and 1).
  lunchRatio: number; // Custom macro ratio to calorieGoal. Unit: % (Between 0 and 1).
  afternoonSnackRatio: number; // Custom macro ratio to calorieGoal. Unit: % (Between 0 and 1).
  eveningSnackRatio: number; // Custom macro ratio to calorieGoal. Unit: % (Between 0 and 1).
  dinnerRatio: number; // Custom macro ratio to calorieGoal. Unit: % (Between 0 and 1).
}

// Table: health.personAllergies
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=personAllergies&schema=health&view=table_structure
// Ref Allergen is same with mealkit.allergen

export interface PersonAllergies {
  allergenId: number;
  personId: number;
}

// Table: health.personDiseases
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=personDiseases&schema=health&view=table_structure

export interface PersonDiseases {
  diseaseId: number;
  personId: number;
}

export const MaingGoalValues = [
  'lostWeight',
  'gainWeight',
  'buildMuscle',
] as const;
export type MainGoals = 'lostWeight' | 'gainWeight' | 'buildMuscle';

export type TrackingTypes = 'calorie' | 'burned-calorie' | 'weight' | 'water';
