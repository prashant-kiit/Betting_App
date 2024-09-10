import Schema from "validate";

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
    match:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{5,}$/,
  },
});

adminSchema.message({
  match: () => ` 
Username must be a valid email id. 
And, Password must follow below rules :
1. Length: At least 8-16 characters.
2. Uppercase letter: At least one uppercase letter (A-Z).
3. Lowercase letter: At least one lowercase letter (a-z).
4. Number: At least one digit (0-9).
5. Special character: At least one special character (@, $, !, %, *, ?, &, #).`,
});

export default adminSchema;
