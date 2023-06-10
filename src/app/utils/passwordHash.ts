import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    return await bcrypt.hashSync(password, 18);
}