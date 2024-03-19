import jwt from 'jsonwebtoken'

const isAuthenticated = (req, res, next) => {
    if (!req.headers.cookie) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = req.headers.cookie.split('=')[1]
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        req.user = user
        return next()
    })
    return null
}

export default isAuthenticated
