class UserInfo {
  constructor({ userNameSelector, userBioSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userBio = document.querySelector(userBioSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.bio = this._userBio.textContent;

    return userInfo;
  }

  setUserInfo({ name, bio }) {
    this._userName.textContent = name;
    this._userBio.textContent = bio;
  }
}

export default UserInfo;
