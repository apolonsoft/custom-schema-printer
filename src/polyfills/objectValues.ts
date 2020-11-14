// @flow strict

export type ObjMap<T> = { [key: string]: T, __proto__?: null };

/* eslint-disable no-redeclare */
// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/2221
const objectValues: <T = any>(obj: ObjMap<T>) => Array<T> = 
  Object.values || ((obj) => Object.keys(obj).map((key) => obj[key]));
export {objectValues};
