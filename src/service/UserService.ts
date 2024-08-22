import { User } from '../entity/User';

class UserService {

    async createUser(username: string): Promise<User | null> {
        const usersWithSameUsername = await User.find({
            where: {
                username,
            },
        });

        if (usersWithSameUsername.length > 0) {
            return null;
        }

        const user = new User();
        user.username = username;
        await user.save();

        return user;
    }
}

const userService = new UserService();
export { userService as UserService };