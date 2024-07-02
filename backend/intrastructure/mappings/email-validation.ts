export function validateEmail(parameter: any) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  if (!regex.test(parameter))
    throw new Error(
      `${Object.keys({ parameter })[0]} should be a valid e-mailc.`,
    );
}
