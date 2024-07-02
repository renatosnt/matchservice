export function validateParameterIsNotUndefined(parameter: any) {
  if (parameter === undefined)
    throw new Error(
      `${Object.keys({ parameter })[0]} should not be undefined.`,
    );
}
