import * as Yup from "yup";

const validationSchemaLogin = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
}).required();

export default validationSchemaLogin;
