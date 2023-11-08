import * as Yup from "yup";

const password = Yup.object({
  old_password: Yup.string().required("Old Password is required"),
  new_password: Yup.string().required("New Password is required"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("new_password")], "Passwords must match"),
}).required();

export default password;
