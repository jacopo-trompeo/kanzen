export type BaseAuthFields = {
  email: string;
  password: string;
};

export type SignUpFields = BaseAuthFields & {
  confirmPassword: string;
};
