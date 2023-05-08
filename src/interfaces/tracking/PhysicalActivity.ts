export interface PhysicalActivity {
  // Categorical name of the acitivy
  name: string;

  activities: Activity[];
}

export interface Activity {
  // First 2 digits of the 5 number code indicate the general category(bicycling, running) In total there are 21 different categories
  code: number;

  description: string;

  // METABOLIC EQUIVALENT - he ratio of the work metabolic rate to the resting metabolic rate. One MET is defined as 1 kcal/kg/hour and is roughly
  // equivalent to the energy cost of sitting quietly.
  met: number;
}
