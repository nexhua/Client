// Table: health.activityTrackings
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=activityTrackings&schema=health&view=table_structure

export interface ActivityTracking {
  id: number;
  activityId: number | null;
  personId: number;
  calories: number | null; // Unit: cal.
  duration: number; // Unit: min.
  createdAt: Date;
  date: Date;
}
