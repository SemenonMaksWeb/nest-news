import * as bcrypt from 'bcrypt';
export function hashBcrypt(setValue) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(setValue, salt);
}
export function compareBcrypt(string, hash) {
  return bcrypt.compareSync(string, hash);
}
