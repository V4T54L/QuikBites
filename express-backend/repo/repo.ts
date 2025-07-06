import { User } from '../model/model';

let users: User[] = [];

export class UserRepository {
  getAll(): User[] {
    return users;
  }

  getById(id: number): User | undefined {
    return users.find(u => u.id === id);
  }

  create(user: User): User {
    users.push(user);
    return user;
  }
}
