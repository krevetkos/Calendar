/**
 * @api {post} /api/owner/login Login account
 * @apiName LoginOwners
 * @apiGroup Owner
 *
 * @apiParam {String} [name] User name
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "name": "Someone",
 *     "mail": "Someone@techmagic.co",
 *     "password": "11223344"
 * }
 *
 * @apiSuccess {String} accessToken Access token
 * @apiSuccess {String} refreshToken Refresh token
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "access": "accessToken",
 *          "refresh": "refreshToken"
 *      }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Bad Request"
 *     }
 */
/**
 * @api {post} /api/owner/refresh Refresh login account
 * @apiName RefreshToken
 * @apiGroup Owner
 *
 * @apiParam {String} refreshToken Refresh token
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "refresh": "refreshToken"
 * }
 *
 * @apiSuccess {String} accessToken Access token
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "access": "accessToken",
 *      }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Bad Request"
 *     }
 */