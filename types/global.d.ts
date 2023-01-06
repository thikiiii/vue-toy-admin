declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;

/**
 * 策略模式
 * [状态, 为true时执行的回调函数]
 */
declare type TacticsAction = [ boolean, () => void ]




