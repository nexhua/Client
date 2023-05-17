// Table: health.weightTrackings
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=weightTrackings&schema=health&view=table_structure

export interface WeightTracking {
  id: number;
  personId: number;
  bodyFatRatio: number | null; // Ratio to bodyWeight. Unit: % (Between 0 and 1).
  bodyWaterRatio: number | null; // Ratio to bodyWeight. Unit: % (Between 0 and 1).
  bodyWeight: number; // Unit: kg.
  boneMassRatio: number | null; // Ratio to bodyWeight. Unit: % (Between 0 and 1).
  createdAt: Date;
  date: Date;
  muscleMassRatio: number | null; // Ratio to bodyWeight. Unit: % (Between 0 and 1).
  skeletalMuscleRatio: number | null; // Ratio to bodyWeight. Unit: % (Between 0 and 1).
}
