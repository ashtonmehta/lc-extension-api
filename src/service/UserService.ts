import { User } from '../entity/User';

export class UserService {

    async getUserById(id: string): Promise<User | null> {
        const user = await User.findOne({
            where: {
                id: parseInt(id),
            },
        });
        return user || null;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await User.find();
        return users
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = await User.findOne({
            where: {
                username,
            },
        });
        
        return user || null;
    }


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