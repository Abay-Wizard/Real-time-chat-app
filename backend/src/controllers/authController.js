const login = async (req, res) =>{
 await res.send('welcome to the login page!')
}

const signup = async (req, res) => {
    await res.send('this is a signup page.')
}

const logout = async (req, res) => {
    await res.send('this is where you logout!')
}

export {login,logout,signup}