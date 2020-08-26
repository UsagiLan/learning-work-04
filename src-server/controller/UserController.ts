interface UserInfo{
    username: string,
    password: string,
    role: string,
    role_id: number,
    name: string,
    email?: string
}

class UserController{


  // 获取所有用户的信息
  public getUserInfo() {

  }

  public getUpperLevelUser(level: Number = 0) {
      // 获取比level更高级的用户们的信息
  }
}
export default new UserController();