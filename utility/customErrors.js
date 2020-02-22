class CustomError extends Error {
  badRequest (message) {
    return {
      status: 400,
      message
    }
  }

  unauthorized (message) {
    return {
      status: 401,
      message
    }
  }

  forbidden (message) {
    return {
      status: 403,
      message
    }
  }

  notFound (message) {
    return {
      status: 404,
      message
    }
  }
}
const customError = new CustomError()
exports.customError = customError
