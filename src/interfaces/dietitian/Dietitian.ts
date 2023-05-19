// Table: dietitian.nutritionists
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=nutritionists&schema=dietitian&view=table_structure

export interface Nutritionist {
  id: number;
  addressId: number | null;
  userId: number;
  address: string | null;
  biography: string | null;
  isAvailable: boolean;
  isDietitian: boolean;
  isVisible: boolean;
  name: string;
  photoUrl: string | null;
  title: string | null;
}
