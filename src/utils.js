module.exports = {
    isAnon: (user) => {
        return !user || user === null;
    },
    isAdmin: (user) => {
        if (user === 'admin') {
            return true;
        } else {
            return false;
        }
        // console.log(user);
        // return user  || user === "admin";
    }
}