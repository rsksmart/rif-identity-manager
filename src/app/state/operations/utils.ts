export type Callback<T> = (err?: Error, res?: T) => void

export const callbackify = (promise: () => Promise<any>, cb: (arg0: undefined, arg1: undefined) => any) => cb ? promise().then((res: any) => cb(undefined, res)).catch((err: any) => cb(err, undefined)) : promise()
