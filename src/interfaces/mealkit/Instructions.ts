// Table: mealkit.instructions
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=instructions&schema=mealkit&view=table_structure

export interface Instructions {
  id: number;
  recipeId: number;
  index: number;
  text: string;
}
