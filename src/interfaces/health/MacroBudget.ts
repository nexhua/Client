// Table: health.macroBudgets
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=macroBudgets&schema=health&view=table_structure

export interface MacroBudget {
  id: number;
  carbRatio: number; // Macro ratio to calorieGoal. Unit: % (Between 0 and 1).
  code: string;
  fatRatio: number; // Macro ratio to calorieGoal. Unit: % (Between 0 and 1).
  fibre: number; // Unit: g.
  name: string;
  proteinRatio: number; // Macro ratio to calorieGoal. Unit: % (Between 0 and 1).
}
