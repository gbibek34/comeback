const successRes = (res, message, data = null) => {
    if (data === null) {
        return res.status(200).json({
            success: true,
            message
        });
    }
    return res.status(200).json({
        success: true,
        message,
        data
    });
};

const customRes = (res, success, message, code, data = null) => {
    const response = {
        success,
        message
    };
    if (data !== null) {
        response.data = data;
    }
    return res.status(code).json(response);
};

const errorRes = (res, error) => {
    return res.status(500).json({
        success: false,
        message: "Unexpected Error!",
        error: error.stack || error.message || error
    });
};

module.exports = { successRes, customRes, errorRes };
