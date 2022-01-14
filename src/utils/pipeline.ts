export class Pipeline<TStep> {
  constructor(
    private readonly DEFAULT_VALUE: TStep,
    private callbackStep?: (step: TStep) => void
  ) {}

  private _step: TStep = this.DEFAULT_VALUE;

  get step(): TStep {
    return this._step;
  }

  setStep(step: TStep = this.DEFAULT_VALUE) {
    this._step = step;
    this.callbackStep?.(step);
  }

  exec<T>(fn: () => T, step?: TStep): T {
    const ret = fn();
    if (
      ret instanceof Promise ||
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
      (typeof ret === "object" && ret && (ret as any).then instanceof Function)
    ) {
      (ret as unknown as Promise<T>).then(() => {
        if (step !== undefined) {
          this.setStep(step);
        }
      });
    } else {
      if (step !== undefined) {
        this.setStep(step);
      }
    }
    return ret;
  }
}
