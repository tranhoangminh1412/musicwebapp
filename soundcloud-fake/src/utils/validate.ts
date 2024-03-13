export const validateRequired = (name: string, value: any, validates: any) => {
  let message = "";
  if (!value) message = name + validates.required;
  return message;
};

export const validateUsername = (value: string, validates: any) => {
  let message = "";
  const regex = /\s/;
  if (value.length<6) message = validates.invalid_username;
  else if(regex.test(value)) message = validates.username_no_space;
  return message;
};

export const validatePassword = (value: string, validates: any) => {
  let message = "";
  const regex = /^(?=.*[A-Z])(?=.*\d).+/;
  if (value.length < 6) message = validates.error_password_min_length;
  else if (value.length > 32) message = validates.error_password_max_length;
  else if (!regex.test(value)) message = validates.error_password_format;
  return message;
};

export const checkFocusAllInput = (form: HTMLElement) => {
  const inputs = Array.from(form.querySelectorAll("input"));
  const textareas = Array.from(form.querySelectorAll("textarea"));
  const array = [...inputs, ...textareas];
  array.forEach(
    (input: HTMLInputElement | HTMLTextAreaElement, idx: Number) => {
      input.focus();
      if (idx === array.length - 1) input.blur();
    }
  );
};
