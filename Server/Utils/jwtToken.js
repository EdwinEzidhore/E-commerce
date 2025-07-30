//create token and saving it in cookies

const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    // console.log("token is", + token)
    //options for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        secure:process.env.NODE_ENV === 'production'? true: false,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
       
    };
    // console.log(token);

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};


module.exports = sendToken;