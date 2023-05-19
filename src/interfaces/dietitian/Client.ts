// Table: dietitian.nutritionistsClients
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=nutritionistClients&schema=dietitian&view=table_structure

export interface NutritionistClient {
  id: number;
  nutritionistId: number;
  userId: number;
  name: string;
  notes: string | null;
  photoUrl: string | null;
  privateNotes: string | null;
}
