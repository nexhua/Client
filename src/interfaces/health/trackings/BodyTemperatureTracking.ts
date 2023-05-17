// Table: health.bodyTemperatureTracking
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=bodyTemperatureTrackings&schema=health&view=table_structure

export interface BodyTemperatureTracking {
  id: number;
  personId: number;
  measuredAt: Date;
  value: number; // Unit: C°.
}
