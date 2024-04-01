import UserModel from '../models/user.model.js';

class SessionDao {
  constructor() {
    this.userModel = UserModel;
  }

  findUserByEmail = async (email) => {
    try {
      const findUserByEmail = await this.userModel.findOne({ email });
      return findUserByEmail;
    } catch (error) {
      throw new Error('Error al traer el usuario por su email');
    }
  };

  registerUser = async (body) => {
    try {
      const registerUser = await this.userModel.create(body);
      return registerUser;
    } catch (error) {
      throw new Error('Error al crear el usuario');
    }
  };
}

export default SessionDao;
