// Table: health.heartRateTracking
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=heartRateTrackings&schema=health&view=table_structure

export interface HeartRateTracking {
  id: number;
  personId: number;
  measuredAt: Date;
  value: number; // Unit: bpm.
}
