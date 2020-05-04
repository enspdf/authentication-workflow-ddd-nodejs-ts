import IUserReadOnlyRepository from "../../src/application/repositories/IUserReadOnlyRepository";
import User from "../../src/domain/User";

export default class FakeUserRepository implements IUserReadOnlyRepository {
    public users = [
        {
            email: "email@email.com",
            id: "1234",
            name: "Name",
            password: "pass",
            type: "email"
        },
        {
            email: "email2@email2.com",
            id: "1234",
            name: "Name2",
            password: "pass2",
            type: "email"
        }
    ]

    public async fetch(user: User): Promise<User> {
        const res = await this.users.find(x => x.email === user.email);

        if (!res) {
            return null;
        }

        if (res.password !== user.password) {
            throw Error("Invalid email or password");
        }

        user.id = res.id;
        user.name = res.name;

        return user;
    }

    public async add(user: User): Promise<User> {
        const max = 9999;
        const min = 1000;
        user.id = (Math.floor(Math.random() * (+max - +min)) + +min).toString();

        this.users.push({
            email: user.email,
            id: user.id,
            name: user.name,
            password: user.password,
            type: user.type
        });

        return user;
    }
}