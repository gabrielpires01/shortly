import { userRepositoy } from "../repositories/userRepository.js";

const validateToken = async (req,res,next) => {
    const auth = req.headers.authorization;
    const token = auth?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401)

    try {
        const {rows: sessions} = await userRepositoy.getSession(token);
        if(!sessions[0]) return res.sendStatus(401)

        const {rows: users} = await userRepositoy.getUser(sessions[0].userId)
        if(!users) return res.sendStatus(401)

        res.locals.user = users[0]
        next()
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
};

export default validateToken