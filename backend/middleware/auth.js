// import jwt from 'jsonwebtoken';

// const authMiddleware = async (req, res, next) => {
//     const { token } = req.headers;
//     if (!token) {
//         return res.json({success:false,message:'Not Authorized Login Again'});
//     }
//     try {
//         const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         return res.json({success:false,message:error.message});
//     }
// }

// export default authMiddleware;
// middleware/authMiddleware.js (UPDATED for best practice)

import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({success:false,message:'Not Authorized Login Again'});
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // 1. 💡 Standard/Secure Way (req.userId)
        req.userId = token_decode.id; 
        
        // 2. 🔌 Backward Compatibility (req.body.userId - for existing controllers)
        req.body.userId = token_decode.id; 
        
        next();
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export default authMiddleware;