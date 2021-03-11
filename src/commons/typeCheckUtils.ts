export function isFunction(x: any) {
    return Object.prototype.toString.call(x) === "[object Function]";
}


export function isArray (x: any) {
    return Object.prototype.toString.call(x) === "[object Array]";
}


export function isDate (x: any) {
    return Object.prototype.toString.call(x) === "[object Date]";
}


export function isObject (x: any) {
    return Object.prototype.toString.call(x) === "[object Object]";
}
