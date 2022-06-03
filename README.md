# Expression Validator
Validate Expressions against a value

## Usage

```typescript
import ExpressionValidator from "expr-validator";

const testExpr = {
  $and: [
    { $gt: 10 },
    { $lt: 20 }
  ]
}

const validation25 = ExpressionValidator(testExpr, 25)
console.log(validation25);      // false

const validation15 = ExpressionValidator(testExpr, 15);
console.log(validation15);      // true
```