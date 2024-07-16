export function validateParameterIsNotUndefined(parameter: any) {
  if (parameter === undefined)
    throw new Error(
      `One of the parameters passed is undefined, but it shouldn't be.`,
    );
}
