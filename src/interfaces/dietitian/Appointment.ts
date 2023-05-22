// Table: dietitian.nutritionistAppointments
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=nutritionistAppointments&schema=dietitian&view=table_structure

export interface NutritionistAppointment {
  id: number;
  clientId: number;
  createdAt: Date;
  dateTime: Date;
  notes: string | null;
}
