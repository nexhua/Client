// Table: health.activityCategories
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=activityCategories&schema=health&view=table_structure

export interface ActivityCategory {
  id: number;

  // Categorical name of the acitivy
  name: string;

  code: string;
}

// Table: health.activities
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=activityCategories&schema=health&view=table_structure

export interface Activity {
  id: number;
  categoryId: number;

  // First 2 digits of the 5 number code indicate the general category(bicycling, running) In total there are 21 different categories
  code: number;

  name: string;

  // METABOLIC EQUIVALENT - the ratio of the work metabolic rate to the resting metabolic rate. One MET is defined as 1 kcal/kg/hour and is roughly
  // equivalent to the energy cost of sitting quietly.
  metRatio: number;
}
