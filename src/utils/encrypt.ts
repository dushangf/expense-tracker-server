import * as bcrypt from 'bcrypt';

export const verify = (
  inputPassword: string,
  userPassword: string,
): Promise<boolean> | boolean => {
  const validity = bcrypt.compare(inputPassword, userPassword);

  return validity;
};

export const encrypt = (password: string): Promise<string> => {
  const hash = bcrypt.hash(password, 10);

  return hash;
};
