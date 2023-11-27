import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
dotenv.config();


const authenticateUser = (req, res, next) => {
    const publicRoutes = ['/api/users/logIn', '/api/users/signUp'];
    if (publicRoutes.includes(req.path)) {
        next();
    } else{
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const token = authHeader && authHeader.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
                if(err){
                    res.status(401).json({ error: 'Unauthorized' });
                }else{
                    const { role } = decoded;
                    req.user = decoded;
                    if(role === 'ADMIN'){
                        next();
                    }else{
                        if (!req.path.includes('/admin')) {
                            // Allow regular users access to routes not under '/admin'
                            next();
                        } else {
                        // Restrict admin routes for regular users
                        res.status(403).json({ error: 'Insufficient permissions'});
                        }
                    }
                }

            });

        }else{
            res.status(401).json({ error: 'have no permission to access' });
        }
    }
}
export default authenticateUser;
  