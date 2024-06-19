import { IErrorMsg } from "../../../components/error-msg/error-msg.component";

export const validations: IErrorMsg = {
  name: [
    { type: "required", message: "Name is required" },
    { type: "minlength", message: "Name characters min 5" },
    { type: "maxlength", message: "Name characters max 20" }
  ],
  age: [
    { type: "required", message: "Age is required" },
    { type: "min", message: "Age min 18" },
    { type: "max", message: "Age max 120" }
  ],
  email: [
    { type: "required", message: "Email is required" },
    { type: "email", message: "Email format incorrect" }
  ],
  password: [
    { type: "required", message: "Password is required" },
    { type: "minlength", message: "Password characters min 8" },
    { type: "maxlength", message: "Password characters max 20" },
    {
      type: "pattern",
      message:
        "Password must contain at least one uppercase letter, one lowercase letter and one digit without spaces."
    }
  ],
  confirmPassword: [
    { type: "required", message: "Confirm password is required" }
  ]
};
