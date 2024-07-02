export function validateUUID(parameter: any) {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!regex.test(parameter))
    throw new Error(`${Object.keys({ parameter })[0]} should be a valid UUID.`);
}
