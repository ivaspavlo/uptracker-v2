
export const DefaultInputErrors: { [key: string]: string } = {
  required: 'This field is required',
  minlength: 'The value is too small',
  maxlength: 'The value is too big'
};

export const DefaultInputErrorsMap: Map<string, string> = new Map(Object.entries(DefaultInputErrors));
