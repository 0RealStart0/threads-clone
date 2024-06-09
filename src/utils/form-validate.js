export const usernameValidate = {
  required: {
    value: true,
    message: "Please enter username",
  },
  minLength: {
    value: 4,
    message: "Username must be at least 6 characters long",
  },
  pattern: {
    value: /^[A-Za-z0-9._]+$/,
    message:
      "This pattern allows alphanumeric characters, as well as periods (.), and underscores (_).",
  },
};
export const fullNameValidate = {
  required: {
    value: true,
    message: "Please enter full-name",
  },
  minLength: {
    value: 3,
    message: "full-name must be at least 3 characters long",
  },
};

export const emailValidate = {
  required: {
    value: true,
    message: "Please enter an email address",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Email address is not valid",
  },
};

export const passwordValidate = {
  required: {
    value: true,
    message: "Please enter password",
  },
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters long",
  },
};

export const passwordConfirmValidate = {
  required: {
    value: true,
    message: "Please enter password-confirm",
  },
};

export const linkValidate = {
  pattern: {
    value:
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
    message: "유효한 URL을 입력하세요.",
  },
};

export const bioValidata = {
  maxLength: {
    value: 150,
    message: "150자 이하로 입력하시오",
  },
  validate: (value) => {
    const lines = value.split(`\n`).length;

    return lines <= 12 || "12줄을 초과할수 없습니다.";
  },
};

export const postValidata = {
  maxLength: {
    value: 500,
    message: "500자 이하로 입력하시오",
  },
  validate: (value) => {
    const lines = value.split(`\n`).length;

    return lines <= 20 || "20줄을 초과할수 없습니다.";
  },
};
