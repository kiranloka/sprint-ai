import bcrypt from 'bcrypt';

const saltRound = 10;

export const encryptPassword = async (plainPassword: string) => {
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
};

export const decryptPassword = async (plainPassword: string, hash: string) => {
  return await bcrypt.compare(plainPassword, hash);
};
