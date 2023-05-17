// Table: health.bloodGlucoseTrackings
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=bloodGlucoseTrackings&schema=health&view=table_structure

export interface BloodGlucoseTracking {
  id: number;
  personId: number;
  measuredAt: Date;
  value: number; // Unit: mg/dL.
}
