import { Expression, OPERATOR, VARIABLE, VARIABLE_DATA } from "./types";

export * from "./types";

export default function Validate(
  expr: Expression,
  value: any,
  context: VARIABLE_DATA = {}
) {
  if (expr === null) {
    return null;
  }

  if (typeof expr !== "object") {
    if (typeof expr === "string") {
      if (context[expr]) {
        return context[expr];
      } else if (expr === VARIABLE.UNIX_CURR_TIME) {
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
    case OPERATOR.EQUAL_TO:
      return value === Validate(expr[op], value, context);
    case OPERATOR.NOT_EQUAL_TO:
      return value !== Validate(expr[op], value, context);
    case OPERATOR.GREATER_THAN:
      return value > Validate(expr[op], value, context);
    case OPERATOR.GREATER_THAN_OR_EQUAL_TO:
      return value >= Validate(expr[op], value, context);
    case OPERATOR.LESS_THAN:
      return value < Validate(expr[op], value, context);
    case OPERATOR.LESS_THAN_OR_EQUAL_TO:
      return value <= Validate(expr[op], value, context);
    case OPERATOR.AND:
      return (expr[op] as Array<Expression>).every((e) =>
        Validate(e, value, context)
      );
    case OPERATOR.OR:
      return (expr[op] as Array<Expression>).some((e) =>
        Validate(e, value, context)
      );
    case OPERATOR.REGEX:
      return new RegExp(expr[op]).test(value);
    case OPERATOR.IN:
      return (expr[op] as Array<any>).indexOf(value) !== -1;
    case OPERATOR.NOT_IN:
      return (expr[op] as Array<any>).indexOf(value) === -1;
    default:
      throw new Error(`Unknown keyword '${op}'`);
  }
}
