const validate = (Schema) => async (req, res, next) => {
    try {
        const parseBody = await Schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (error) {
        res.status(401).json({ message: error.errors[0].message })
    }
}

export default validate