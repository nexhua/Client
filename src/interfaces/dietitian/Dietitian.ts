// Table: dietitian.nutritionists
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=nutritionists&schema=dietitian&view=table_structure

export interface Nutritionist {
  id: number;
  addressId: number;
  userId: number;
  address: string;
  biography: string;
  isAvailable: boolean;
  isDietitian: boolean;
  isVisible: boolean;
  name: string;
  photoUrl: string;
  title: string;
}
