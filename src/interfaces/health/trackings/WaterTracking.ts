// Table: health.waterTrackings
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=waterTrackings&schema=health&view=table_structure

export interface WaterTracking {
  id: number;
  personId: number;
  createdAt: Date;
  date: Date;
  value: number; // Unit: ml.
}
