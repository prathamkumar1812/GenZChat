export function getsender(users,userData){
    return users[0]._id===userData._id?users[1]:users[0]
}