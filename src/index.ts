import * as _Types from "./types";

export default function Validate(
  expr: _Types.Expression,
  value: any,
  context: _Types.VARIABLE_DATA = {}
) {
  if (expr === null) {
    return null;
  }

  if (typeof expr !== "object") {
    if (typeof expr === "string") {
      if (context[expr]) {
        return context[expr];
      } else if (expr === _Types.VARIABLE.UNIX_CURR_TIME) {
        return Date.now();
      }
    }
    return expr;
  }

  const op = Object.keys(expr).shift();
  if (!op) {
    throw new Error("Expression must have one operation");
  }

  switch (op) {
    case _Types.OPERATOR.EQUAL_TO:
      return value === Validate(expr[op], value, context);
    case _Types.OPERATOR.NOT_EQUAL_TO:
      return value !== Validate(expr[op], value, context);
    case _Types.OPERATOR.GREATER_THAN:
      return value > Validate(expr[op], value, context);
    case _Types.OPERATOR.GREATER_THAN_OR_EQUAL_TO:
      return value >= Validate(expr[op], value, context);
    case _Types.OPERATOR.LESS_THAN:
      return value < Validate(expr[op], value, context);
    case _Types.OPERATOR.LESS_THAN_OR_EQUAL_TO:
      return value <= Validate(expr[op], value, context);
    case _Types.OPERATOR.AND:
      return (expr[op] as Array<_Types.Expression>).every((e) =>
        Validate(e, value, context)
      );
    case _Types.OPERATOR.OR:
      return (expr[op] as Array<_Types.Expression>).some((e) =>
        Validate(e, value, context)
      );
    case _Types.OPERATOR.REGEX:
      return new RegExp(expr[op]).test(value);
    case _Types.OPERATOR.IN:
      return (expr[op] as Array<any>).indexOf(value) !== -1;
    case _Types.OPERATOR.NOT_IN:
      return (expr[op] as Array<any>).indexOf(value) === -1;
    default:
      throw new Error(`Unknown keyword '${op}'`);
  }
}

export const Types = _Types;
