const createError = require("http-errors");
const User = require("../../model/User");

async function singin(params) {
     const { email, password } = params;
    // find user and pass if both match then create token and return token
    const user = await User.findOne({ email });
    if (!user) throw new createError(400, "User is not registered !");

    const isMatched = bcrypt.compareSync(password, user?.password);
    if (!isMatched) throw new createError(401, "Email/Password not matched");

    const jwtOptions = { expiresIn: "4h" };
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, jwtOptions);
    return token;
}
