import * as Yup from "yup";

const validationSchemaImage = Yup.object({
  name: Yup.string().required(),
  image: Yup.mixed().required(),
}).required();

export default validationSchemaImage;
