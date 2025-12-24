import bcrypt from "bcrypt";
export class PasswordUtil {
    static hash(password) {
        return bcrypt.hash(password, 10);
    }
    static compare(password, hash) {
        return bcrypt.compare(password, hash);
    }
}
