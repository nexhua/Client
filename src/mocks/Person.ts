import {type Person} from '../interfaces/health/Person';

export const person: Person = {
  id: 0,
  userId: 15,
  createdAt: new Date(),
  index: null,
  isOwnedByUser: true,
  name: 'John Doe',
  photoUrl: null,
  activityIntensity: 'sedentary',
  birthDate: new Date(1995),
  diet: null,
  gender: 'm',
  height: 180,
  menopauseDate: null,
  menstrualCycleDays: null,
  pregnancyDueDate: null,
  mainGoal: 'lostWeight',
  activityGoal: 1000,
  calorieGoal: 2500,
  stepsGoal: 8000,
  weightGoal: 70,
  weightPaceGoal: 1,
  macroBudgetId: null,
  customCarbRatio: 0.55,
  customFatRatio: 0.25,
  customProteinRatio: 0.2,
  customFibreBudget: 20,
  breakfastRatio: 0.2,
  morningSnackRatio: 0,
  lunchRatio: 0.2,
  afternoonSnackRatio: 0.1,
  eveningSnackRatio: 0.1,
  dinnerRatio: 0.4,
};
