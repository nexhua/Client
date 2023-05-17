// Table: health.stepTrackings
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=stepTrackings&schema=health&view=table_structure

export interface StepTracking {
  id: number;
  personId: number;
  createdAt: Date;
  date: Date;
  value: number; // Unit: steps.
}
