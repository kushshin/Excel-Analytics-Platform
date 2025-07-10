import jwt from 'jsonwebtoken';



const validationMiddleware =async(req,res,next)=>{
   const token = req.cookies?.Token
//    console.log({token : token})
    if (!token) {
        return res.status(401).json({error: "authentication failed"})
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Authentication failed: Invalid token' });
        }
        req.user = user
        // console.log({usered: req.user.id})
        next()
    })
}
const adminValidationMiddleware =async(req,res,next)=>{
   const adminToken = req.cookies?.adminToken
//    console.log({token : token})
    if (!adminToken) {
        return res.status(401).json({error: "authentication failed"})
    }
    jwt.verify(adminToken, process.env.ADMIN_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Authentication failed: Invalid admintoken' });
        }
        req.user = user
        // console.log({usered: req.user.id})
        next()
    })
}

export  {validationMiddleware,adminValidationMiddleware}