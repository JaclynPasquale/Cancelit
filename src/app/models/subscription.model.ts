export class Subscription {
  id: string;
  name: string;
  websiteUrl: string;
  cancelUrl: string;
  startDate: Date;
  endDate: Date;
  trialPeriod: number;
  active: boolean;

  public constructor(init?: Partial<Subscription>) {
    Object.assign(this, init);
  }
}
