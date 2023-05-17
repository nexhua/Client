// Table: health.bloodPressureTrackings
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=bloodPressureTrackings&schema=health&view=table_structure

export interface BloodPressureTracking {
  id: number;
  personId: number;
  measuredAt: Date;
  diastolicValue: number; // Küçük tansiyon. Unit: mmHg.
  systolicValue: number; // Büyük tansiyon. Unit: mmHg.
}
