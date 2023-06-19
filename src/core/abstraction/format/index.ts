export function toPrettyJsonString(object: any): string {
  return JSON.stringify(object, null, 2);
}
