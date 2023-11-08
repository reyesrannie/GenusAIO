import * as Yup from "yup";

const validationSchemaLinks = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  logo: Yup.string().required(),
  image: Yup.string().required(),
  url: Yup.string().url().required(),
}).required();

export default validationSchemaLinks;
