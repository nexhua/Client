// Table: health.sleepTrackings
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=sleepTrackings&schema=health&view=table_structure

export interface SleepTracking {
  id: number;
  personId: number;
  createdAt: Date;
  startedAt: Date;
  endedAt: Date;
}
