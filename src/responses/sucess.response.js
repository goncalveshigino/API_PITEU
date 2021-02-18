module.exports = (res, httpStatus, message, data, meta) => {
    return res.status(httpStatus).json({
        status: "SUCESS",
        message: message,
        meta: meta,
        data: data
    })
}