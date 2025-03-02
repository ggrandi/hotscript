import { Fn, unset, _ } from "../core/Core";
import { Std } from "../std/Std";
import { Tuples } from "../tuples/Tuples";
import * as H from "../helpers";
import * as Impl from "./impl/strings";
import { Functions } from "../functions/Functions";

export namespace Strings {
  export type Stringifiable =
    | string
    | number
    | boolean
    | bigint
    | null
    | undefined;

  /**
   * Get the length of a string.
   * @warning - 🔥🔥🔥does not work with emojis since they are multiple characters🔥🔥🔥
   * @param args[0] - The string to get the length of.
   * @returns The length of the string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Length,"abc">; // 3
   * ```
   */
  export type Length<Str = unset> = Functions.PartialApply<LengthFn, [Str]>;

  /**
   * Get the length of a string.
   * @warning - 🔥🔥🔥does not work with emojis since they are multiple characters🔥🔥🔥
   * @param args[0] - The string to get the length of.
   * @returns The length of the string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Length,"abc">; // 3
   * ```
   */
  export interface LengthFn extends Fn {
    return: this["arg0"] extends string ? Impl.Length<this["arg0"]> : never;
  }

  /**
   * Trim the left side of a string.
   * @param args[0] - The string to trim.
   * @param Sep - The separator to trim.
   * @returns The trimmed string.
   * @example
   * ```ts
   * type T0 = Call<Strings.TrimLeft,"  abc">; // "abc"
   * ```
   */
  export type TrimLeft<
    Sep extends string | _ = " ",
    Str = unset
  > = Functions.PartialApply<TrimLeftFn, [Sep, Str]>;

  interface TrimLeftFn extends Fn {
    return: this["args"] extends [
      infer Sep extends string,
      infer Str extends string,
      ...any
    ]
      ? Impl.TrimLeft<Str, Sep>
      : never;
  }

  /**
   * Trim the right side of a string.
   * @param args[0] - The string to trim.
   * @param Sep - The separator to trim.
   * @returns The trimmed string.
   * @example
   * ```ts
   * type T0 = Call<Strings.TrimRight,"abc  ">; // "abc"
   * ```
   */
  export type TrimRight<
    Sep extends string | _ = " ",
    Str = unset
  > = Functions.PartialApply<TrimRightFn, [Sep, Str]>;

  interface TrimRightFn extends Fn {
    return: this["args"] extends [
      infer Sep extends string,
      infer Str extends string,
      ...any
    ]
      ? Impl.TrimRight<Str, Sep>
      : never;
  }

  /**
   * Trim a string.
   * @param args[0] - The string to trim.
   * @param Sep - The separator to trim.
   * @returns The trimmed string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Trim,"  abc  ">; // "abc"
   * ```
   */
  export type Trim<
    Sep extends string | _ = " ",
    Str = unset
  > = Functions.PartialApply<TrimFn, [Sep, Str]>;

  interface TrimFn extends Fn {
    return: this["args"] extends [
      infer Sep extends string,
      infer Str extends string,
      ...any
    ]
      ? Impl.Trim<Str, Sep>
      : never;
  }

  /**
   * Replace all instances of a substring in a string.
   * @param args[0] - The string to replace.
   * @param from - The substring to replace.
   * @param to - The substring to replace with.
   * @returns The replaced string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Replace<".","/">,"a.b.c.d">; // "a/b/c/d"
   */
  export type Replace<
    from extends string | unset | _ = unset,
    to extends string | unset | _ = unset,
    str = unset
  > = Functions.PartialApply<ReplaceFn, [from, to, str]>;

  interface ReplaceFn extends Fn {
    return: this["args"] extends [
      infer From extends string,
      infer To extends string,
      infer Str
    ]
      ? Impl.Replace<Str, From, To>
      : never;
  }

  /**
   * Cut a slice of a string out from a start index to an end index.
   * @warning - 🔥🔥🔥does not work with emojis since they are multiple characters🔥🔥🔥
   * @param args[0] - The string to slice.
   * @param start - The start index.
   * @param end - The end index.
   * @returns The sliced string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Slice<1,9>,"1234567890">; // "23456789"
   */
  export type Slice<
    start extends number | unset | _ = unset,
    end extends number | unset | _ = unset
  > = Functions.ComposeLeft<
    [Strings.Split<"">, Tuples.Take<end>, Tuples.Drop<start>, Tuples.Join<"">]
  >;

  /**
   * Split a string into a tuple of strings.
   * @warning - 🔥🔥🔥using an empty sep with emojis in the string will destroy the emoji🔥🔥🔥
   * @param args[0] - The string to split.
   * @param sep - The separator to split the string with.
   * @returns The split string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Split<",">,"a,b,c">; // ["a","b","c"]
   * ```
   */
  export type Split<
    Sep extends string | unset | _ = unset,
    Str extends string | unset | _ = unset
  > = Functions.PartialApply<SplitFn, [Sep, Str]>;

  export interface SplitFn extends Fn {
    return: this["args"] extends [infer Sep extends string, infer Str]
      ? Impl.Split<Str, Sep>
      : never;
  }

  /**
   * Repeat a string a number of times.
   * @param args[0] - The string to repeat.
   * @param times - The number of times to repeat the string.
   * @returns The repeated string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Repeat<3>,"Hello! ">; // "Hello! Hello! Hello! "
   * ```
   */
  export type Repeat<
    Times extends number | _ | unset = unset,
    Str extends string | _ | unset = unset
  > = Functions.PartialApply<RepeatFn, [Times, Str]>;

  interface RepeatFn extends Fn {
    return: this["args"] extends [
      infer Times extends number,
      infer Str extends string
    ]
      ? Impl.Repeat<Str, Times>
      : never;
  }

  /**
   * Check if a string starts with a substring.
   * @param args[0] - The string to check.
   * @param str - The substring to check for.
   * @returns Whether the string starts with the substring.
   * @example
   * ```ts
   * type T0 = Call<Strings.StartsWith<"abc">,"abcdef">; // true
   * type T1 = Call<Strings.StartsWith<"abc">,"defabc">; // false
   * ```
   */
  export type StartsWith<
    Start extends string | _ | unset = unset,
    Str extends string | _ | unset = unset
  > = Functions.PartialApply<StartsWithFn, [Start, Str]>;

  interface StartsWithFn extends Fn {
    return: this["args"] extends [infer Start extends string, infer Str]
      ? Str extends `${Start}${string}`
        ? true
        : false
      : never;
  }

  /**
   * Check if a string ends with a substring.
   * @param args[0] - The string to check.
   * @param str - The substring to check for.
   * @returns Whether the string ends with the substring.
   * @example
   * ```ts
   * type T0 = Call<Strings.EndsWith<"abc">,"abcdef">; // false
   * type T1 = Call<Strings.EndsWith<"abc">,"defabc">; // true
   * ```
   */
  export type EndsWith<
    End extends string | _ | unset = unset,
    Str extends string | _ | unset = unset
  > = Functions.PartialApply<EndsWithFn, [End, Str]>;

  interface EndsWithFn extends Fn {
    return: this["args"] extends [infer End extends string, infer Str]
      ? Str extends `${string}${End}`
        ? true
        : false
      : never;
  }

  /**
   * Split a string into a tuple of each character.
   * @warning - 🔥🔥🔥does not work with emojis since they are multiple characters🔥🔥🔥
   * @param args[0] - The string to split.
   * @returns The splited string.
   * @example
   * ```ts
   * type T0 = Call<Strings.ToTuple,"abc">; // ["a","b","c"]
   * ```
   */
  export interface ToTuple extends Fn {
    return: Impl.StringToTuple<this["arg0"]>;
  }

  /**
   * Convert a string to a number or bigint.
   * @param args[0] - The string to convert.
   * @returns The converted number or bigint.
   * @example
   * ```ts
   * type T0 = Call<Strings.ToNumber,"123">; // 123
   * type T1 = Call<Strings.ToNumber,"12367543547677078675456656790">; // 12367543547677078675456656790n
   * ```
   */
  export interface ToNumber extends Fn {
    return: this["arg0"] extends `${infer n extends number | bigint}`
      ? n
      : never;
  }

  /**
   * Convert a stringifiable literal to a string.
   * @param args[0] - The stringifiable literal to convert.
   * @returns The converted string.
   * @example
   * ```ts
   * type T0 = Call<Strings.ToString,123>; // "123"
   * type T1 = Call<Strings.ToString,true>; // "true"
   * type T2 = Call<Strings.ToString,null>; // "null"
   * ```
   */
  export interface ToString extends Fn {
    return: `${Extract<this["arg0"], Strings.Stringifiable>}`;
  }

  /**
   * Prepend a string to another string.
   * @param args[0] - The string to be prepended to.
   * @param str - The string to prepend.
   * @returns The prepended string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Prepend<"abc">,"def">; // "abcdef"
   * ```
   */
  export type Prepend<
    Start extends string | _ | unset = unset,
    Str extends string | _ | unset = unset
  > = Functions.PartialApply<PrependFn, [Start, Str]>;

  interface PrependFn extends Fn {
    return: `${Extract<this["arg0"], Strings.Stringifiable>}${Extract<
      this["arg1"],
      Strings.Stringifiable
    >}`;
  }

  /**
   * Append a string to another string.
   * @param args[0] - The string to be appended to.
   * @param str - The string to append.
   * @returns The appended string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Append<"abc">,"def">; // "defabc"
   * ```
   */
  export type Append<
    End extends string | _ | unset = unset,
    Str extends string | _ | unset = unset
  > = Functions.PartialApply<AppendFn, [End, Str]>;

  interface AppendFn extends Fn {
    return: `${Extract<this["arg1"], Strings.Stringifiable>}${Extract<
      this["arg0"],
      Strings.Stringifiable
    >}`;
  }

  /**
   * Transform a string to uppercase.
   * @param args[0] - The string to transform.
   * @returns The transformed string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Uppercase,"abc">; // "ABC"
   * ```
   */
  export interface Uppercase extends Fn {
    return: Std._Uppercase<Extract<this["arg0"], string>>;
  }

  /**
   * Transform a string to lowercase.
   * @param args[0] - The string to transform.
   * @returns The transformed string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Lowercase,"ABC">; // "abc"
   * ```
   */
  export interface Lowercase extends Fn {
    return: Std._Lowercase<Extract<this["arg0"], string>>;
  }

  /**
   * Capitalize a string.
   * @param args[0] - The string to capitalize.
   * @returns The capitalized string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Capitalize,"abc">; // "Abc"
   * ```
   */
  export interface Capitalize extends Fn {
    return: Std._Capitalize<Extract<this["arg0"], string>>;
  }

  /**
   * Uncapitalize a string.
   * @param args[0] - The string to uncapitalize.
   * @returns The uncapitalized string.
   * @example
   * ```ts
   * type T0 = Call<Strings.Uncapitalize,"AddTop">; // "addTop"
   * ```
   */
  export interface Uncapitalize extends Fn {
    return: Std._Uncapitalize<Extract<this["arg0"], string>>;
  }

  /**
   * Convert a string to snake case.
   * @param args[0] - The string to convert.
   * @returns The converted string.
   * @example
   * ```ts
   * type T0 = Call<Strings.SnakeCase,"AddTop">; // "add_top"
   * ```
   */
  export interface SnakeCase extends Fn {
    return: H.SnakeCase<this["arg0"]>;
  }

  /**
   * Convert a string to camel case.
   * @param args[0] - The string to convert.
   * @returns The converted string.
   * @example
   * ```ts
   * type T0 = Call<Strings.CamelCase,"add_top">; // "addTop"
   * ```
   */
  export interface CamelCase extends Fn {
    return: H.CamelCase<this["arg0"]>;
  }

  /**
   * Convert a string to kebab case.
   * @param args[0] - The string to convert.
   * @returns The converted string.
   * @example
   * ```ts
   * type T0 = Call<Strings.KebabCase,"add_top">; // "add-top"
   * type T1 = Call<Strings.KebabCase,"AddTop">; // "add-top"
   * type T2 = Call<Strings.KebabCase,"addTop">; // "add-top"
   * ```
   */
  export interface KebabCase extends Fn {
    return: H.KebabCase<this["arg0"]>;
  }

  /**
   * Compare two strings. (only works with ascii extended characters)
   * @param args[0] - The first string to compare.
   * @param args[1] - The second string to compare.
   * @n1 - The first string to compare or _.
   * @n2 - The second string to compare or _.
   * @returns The result of the comparison.
   * @example
   * ```ts
   * type T0 = Call2<Strings.Compare,"abc","def">; // -1
   * type T1 = Call2<Strings.Compare,"def","abc">; // 1
   * type T2 = Call2<Strings.Compare,"abc","abc">; // 0
   * ```
   */
  export type Compare<
    n1 extends string | _ | unset = unset,
    n2 extends string | _ | unset = unset
  > = Functions.PartialApply<
    CompareFn,
    n2 extends unset ? [unset, n1] : [n1, n2]
  >;

  interface CompareFn extends Fn {
    return: this["args"] extends [
      infer a extends string,
      infer b extends string,
      ...any
    ]
      ? Impl.Compare<a, b>
      : never;
  }

  /**
   * Check if a string is lexically less than another string. (only works with ascii extended characters)
   * @param args[0] - The first string to compare.
   * @param args[1] - The second string to compare.
   * @n1 - The first string to compare or _.
   * @n2 - The second string to compare or _.
   * @returns True if the first string is lexically less than the second string, false otherwise.
   * @example
   * ```ts
   * type T0 = Call2<Strings.LessThan,"abc","def">; // true
   * type T1 = Call2<Strings.LessThan,"def","abc">; // false
   * type T2 = Call2<Strings.LessThan,"abc","abc">; // false
   * ```
   */
  export type LessThan<
    n1 extends string | _ | unset = unset,
    n2 extends string | _ | unset = unset
  > = Functions.PartialApply<
    LessThanFn,
    n2 extends unset ? [unset, n1] : [n1, n2]
  >;

  interface LessThanFn extends Fn {
    return: this["args"] extends [
      infer a extends string,
      infer b extends string,
      ...any
    ]
      ? Impl.LessThan<a, b>
      : never;
  }

  /**
   * Check if a string is lexically less than or equal to another string. (only works with ascii extended characters)
   * @param args[0] - The first string to compare.
   * @param args[1] - The second string to compare.
   * @n1 - The first string to compare or _.
   * @n2 - The second string to compare or _.
   * @returns True if the first string is lexically less than or equal to the second string, false otherwise.
   * @example
   * ```ts
   * type T0 = Call2<Strings.LessThanOrEqual,"abc","def">; // true
   * type T1 = Call2<Strings.LessThanOrEqual,"def","abc">; // false
   * type T2 = Call2<Strings.LessThanOrEqual,"abc","abc">; // true
   */
  export type LessThanOrEqual<
    n1 extends string | _ | unset = unset,
    n2 extends string | _ | unset = unset
  > = Functions.PartialApply<
    LessThanOrEqualFn,
    n2 extends unset ? [unset, n1] : [n1, n2]
  >;

  interface LessThanOrEqualFn extends Fn {
    return: this["args"] extends [
      infer a extends string,
      infer b extends string,
      ...any
    ]
      ? Impl.LessThanOrEqual<a, b>
      : never;
  }

  /**
   * Check if a string is lexically greater than another string. (only works with ascii extended characters)
   * @param args[0] - The first string to compare.
   * @param args[1] - The second string to compare.
   * @n1 - The first string to compare or _.
   * @n2 - The second string to compare or _.
   * @returns True if the first string is lexically greater than the second string, false otherwise.
   * @example
   * ```ts
   * type T0 = Call2<Strings.GreaterThan,"abc","def">; // false
   * type T1 = Call2<Strings.GreaterThan,"def","abc">; // true
   * type T2 = Call2<Strings.GreaterThan,"abc","abc">; // false
   * ```
   */
  export type GreaterThan<
    n1 extends string | _ | unset = unset,
    n2 extends string | _ | unset = unset
  > = Functions.PartialApply<
    GreaterThanFn,
    n2 extends unset ? [unset, n1] : [n1, n2]
  >;

  interface GreaterThanFn extends Fn {
    return: this["args"] extends [
      infer a extends string,
      infer b extends string,
      ...any
    ]
      ? Impl.GreaterThan<a, b>
      : never;
  }

  /**
   * Check if a string is lexically greater than or equal to another string. (only works with ascii extended characters)
   * @param args[0] - The first string to compare.
   * @param args[1] - The second string to compare.
   * @n1 - The first string to compare or _.
   * @n2 - The second string to compare or _.
   * @returns True if the first string is lexically greater than or equal to the second string, false otherwise.
   * @example
   * ```ts
   * type T0 = Call2<Strings.GreaterThanOrEqual,"abc","def">; // false
   * type T1 = Call2<Strings.GreaterThanOrEqual,"def","abc">; // true
   * type T2 = Call2<Strings.GreaterThanOrEqual,"abc","abc">; // true
   * ```
   */
  export type GreaterThanOrEqual<
    n1 extends string | _ | unset = unset,
    n2 extends string | _ | unset = unset
  > = Functions.PartialApply<
    GreaterThanOrEqualFn,
    n2 extends unset ? [unset, n1] : [n1, n2]
  >;

  interface GreaterThanOrEqualFn extends Fn {
    return: this["args"] extends [
      infer a extends string,
      infer b extends string,
      ...any
    ]
      ? Impl.GreaterThanOrEqual<a, b>
      : never;
  }
}
