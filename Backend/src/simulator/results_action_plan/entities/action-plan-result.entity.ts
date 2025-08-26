export class ActionPlanResult {
  id?: number;
  analysisId: number;
  title: string;
  description: string;
  priority: string;

  constructor(
    analysisId: number,
    title: string,
    description: string,
    priority: string,
    id?: number,
  ) {
    this.id = id;
    this.analysisId = analysisId;
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}