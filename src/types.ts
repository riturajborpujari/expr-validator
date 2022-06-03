export const enum VARIABLE {
  MFD = "$mfd",
  EXPIRY = "$expiry",
  MRP = "$mrp",
  SKU_CODE = "$skuCode",
  BATCH_ID = "$batchId",
  UNIX_CURR_TIME = "$unixTime",
}

export const enum OPERATOR {
  GREATER_THAN = "$gt",
  GREATER_THAN_OR_EQUAL_TO = "$gte",
  LESS_THAN = "$lt",
  LESS_THAN_OR_EQUAL_TO = "$lte",
  EQUAL_TO = "$eq",
  NOT_EQUAL_TO = "$ne",
  IN = "$in",
  NOT_IN = "$nin",
  AND = "$and",
  OR = "$or",
  REGEX = "$regex",
}

export type Expression =
  | number
  | string
  | Date
  | boolean
  | { [op in OPERATOR]?: Expression | Expression[] };

export type VARIABLE_DATA = {
  [name in VARIABLE]?: any;
};