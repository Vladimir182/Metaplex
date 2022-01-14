export class FormSubmitting<TData, TResult> {
  constructor(private onSubmit: (data: TData) => Promise<TResult>) {}
  private resolve?: (data: TResult) => void;
  private reject?: (err?: Error | unknown) => void;

  private clear = () => {
    this.resolve = undefined;
    this.reject = undefined;
  };

  manualSubmit(form: HTMLFormElement) {
    form.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
    return this.prepare();
  }

  prepare = () => {
    // if (this.reject) {
    //   // interupt previous form
    //   this.reject(new Error("interrupt by user"));
    // }

    const result = new Promise<TResult>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    result.then(this.clear, this.clear);
    return result;
  };

  submit = (input: TData) => {
    this.onSubmit(input).then(
      (data) => {
        this.resolve?.(data);
        return data;
      },
      (err) => {
        this.reject?.(err);
        throw err;
      }
    );
  };
}
