
import { User } from "../../domain/models/user";

export class UserMapper {
  static fromApiResponse(response: any): User {
    return {
      id: response.id,
      first_name: response.first_name + ' ' + response.last_name,
      email: response.email,
      avatar: response.avatar,
    } as User; 
  }

  
  static toApiRequest(user: User): any {
    const names = user.first_name.split(' ');
    return {
      id: user.id,
      first_name: names[0], 
      last_name: names.slice(1).join(' '), 
      email: user.email,
      avatar: user.avatar,
    };
  }
}
