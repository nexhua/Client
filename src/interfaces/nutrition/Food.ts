// Table: nutrition.foods
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=foods&schema=nutrition&view=table_structure

export interface Food {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  servingSize: number;
  servingSizeUnitId: number;
}
