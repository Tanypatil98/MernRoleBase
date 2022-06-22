import { useState } from "react";

export function useForm(
  initialFValues,
  validateOnChange = false,
  validate = () => {}
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, namefordrop, check = false) => {
    var final_name;
    var final_value;

    if (e.target) {
      const { name, value, files, checked } = e?.target;
      final_name = name;
      
      if (
        name === "phoneNumber" ||
        name === "phone_number" ||
        name === "support_whatsapp" ||
        name === "support_call" ||
        name === "lead_confirmation" ||
        name === "site_visit" ||
        name === "lead_conversion" ||
        name === "privilege_phone_number"
      ) {
        if (!new RegExp(/^[0-9]*$/).test(value)) return;
      }

      if (files?.length > 0 && !check) {
        final_value = files[0];
        setValues({
          ...values,
          [name]: files[0],
          [`${name}_preview`]: URL.createObjectURL(files[0]),
        });
      } else if (!files && !check) {
        final_value = value;
        setValues({
          ...values,
          [name]: value,
        });
      } else if (check) {
        final_name = name;
        final_value = checked;
        setValues({
          ...values,
          [name]: checked,
        });
      }
    } else {
      final_name = namefordrop;
      final_value = e;
      setValues({
        ...values,
        [namefordrop]: e,
      });
    }

    if (validateOnChange) validate({ [final_name]: final_value });
  };

  //   const resetForm = () => {
  //     setValues(initialFValues);
  //     setErrors({});
  //   };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    // resetForm,
  };
}
