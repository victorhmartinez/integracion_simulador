export class DetectedRiskResult {
  id?: number;
  analysisId: number;
  risk: string;
  directCause: string;
  potentialImpact: string;

  constructor(
    analysisId: number,
    risk: string,
    directCause: string,
    potentialImpact: string,
    id?: number,
  ) {
    this.id = id;
    this.analysisId = analysisId;
    this.risk = risk;
    this.directCause = directCause;
    this.potentialImpact = potentialImpact;
  }
}