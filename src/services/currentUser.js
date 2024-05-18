
export default function currentUser() {
    const userToken = localStorage.getItem('token');

    if (!userToken) {
        throw new Error('No token found');
      }

    const user = JSON.parse(atob(userToken.split('.')[1]));
    currentUser = user.username;

    return currentUser
}