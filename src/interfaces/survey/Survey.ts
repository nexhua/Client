class Survey<T> {
  private result: T;
  private isDone: boolean;
  private readonly label: string;

  constructor(result: T, label: string) {
    this.result = result;
    this.label = label;
    this.isDone = false;
  }

  setIsDone(isDone: boolean): void {
    this.isDone = isDone;
  }

  getIsDone(): boolean {
    return this.isDone;
  }

  update(result: T): void {
    this.result = result;
  }

  collect(): T {
    return this.result;
  }

  getLabel(): string {
    return this.label;
  }
}

export class SurveyComponent<T> {
  private readonly survey: Survey<T>;
  private readonly component: JSX.Element;

  constructor(survey: Survey<T>, component: JSX.Element) {
    this.survey = survey;
    this.component = component;
  }

  getComponent(): JSX.Element {
    return this.component;
  }

  getSurvey(): Survey<T> {
    return this.survey;
  }
}

export interface SurveyComponentProps<T> {
  survey: Survey<T>;
}

export default Survey;
