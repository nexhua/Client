// Table: health.periodTrackings
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=periodTrackings&schema=health&view=table_structure

export interface PeriodTracking {
  id: number;
  personId: number;
  measuredAt: Date;
  date: Date;
  flowLevel: 'spotting' | 'light' | 'medium' | 'heavy';
}
