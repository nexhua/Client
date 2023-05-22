// Table: dietitian.nutritionistWorkingHours
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=nutritionistWorkingHours&schema=dietitian&view=table_structure

export interface WorkingHours {
  id: number;
  nutritionistId: number;
  startsAt: number;
  endsAt: number;
  weekday: number;
}
