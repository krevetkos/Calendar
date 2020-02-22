/**
 * @api {post} /api/room Create new room
 * @apiName CrateRoom
 * @apiGroup Room
 *
 * @apiHeader {String} access Users unique access token.
 * @apiHeader {String} refresh Users unique refresh token.
 *
 *  @apiHeaderExample {json} Header-Example:
 *     {
 *       "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzE2MWJkMWM5ZDQ0MDAwMDI3ZWVhMSIsIm1haWwiOiJzb21ib2R5QG1haWwuY29tIiwiaWF0IjoxNTgwMzk2MTk4LCJleHAiOjE1ODEwMDA5OTh9.yKH_lvbSJOpTGW5sEs0qxvzp-AOWuycshWNJcTPr1ZI",
 *       "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzE2MWJkMWM5ZDQ0MDAwMDI3ZWVhMSIsIm1haWwiOiJzb21ib2R5QG1haWwuY29tIiwiaWF0IjoxNTgwMzk2MTk4fQ.plqhqY9Icu3J1jr7vt2jb8GQiBoHqGhKw8b0aYD4ii0"
 *     }
 *
 *
 * @apiParam  {Object} Room Room parameters
 * @apiParam  {String} Room.calendarId Id of google calendar
 * @apiParam  {String} Room.name Name of room
 * @apiParam  {String} Room.owner Owner of room
 * @apiParam  {String} Room.color Color of room
 *
 *
 * @apiParamExample {json} Request-Example:
 *
 *   {
 *       "name": "Room",
 *       "calendarId": "calendar.google.com",
 *       "owner": "5e4121eaea887b24fe85e275",
 *       "color": "#432443"
 * }
 * @apiSuccess {Object} Room Room parameters
 * @apiSuccess  {String} Room._id Id of new room
 * @apiSuccess  {String} Room.calendarId Id of google calendar
 * @apiSuccess  {String} Room.name Name of room
 * @apiSuccess  {String} Room.owner Owner of room
 * @apiSuccess  {String} Room.color Color of room
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *{
 *       "_id": "5e4121eaea887b24fe85e275",
 *       "name": "Room",
 *       "calendarId": "calendar.google.com",
 *       "owner": "5e4121eaea887b24fe85e275",
 *       "color": "#432443"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Bad Request"
 *     }
 **/
/**
 * @api {put} /api/room Update new room
 * @apiName UpdateRoom
 * @apiGroup Room
 *
 * @apiHeader {String} access Users unique access token.
 * @apiHeader {String} refresh Users unique refresh token.
 *
 *  @apiHeaderExample {json} Header-Example:
 *     {
 *       "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzE2MWJkMWM5ZDQ0MDAwMDI3ZWVhMSIsIm1haWwiOiJzb21ib2R5QG1haWwuY29tIiwiaWF0IjoxNTgwMzk2MTk4LCJleHAiOjE1ODEwMDA5OTh9.yKH_lvbSJOpTGW5sEs0qxvzp-AOWuycshWNJcTPr1ZI",
 *       "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzE2MWJkMWM5ZDQ0MDAwMDI3ZWVhMSIsIm1haWwiOiJzb21ib2R5QG1haWwuY29tIiwiaWF0IjoxNTgwMzk2MTk4fQ.plqhqY9Icu3J1jr7vt2jb8GQiBoHqGhKw8b0aYD4ii0"
 *     }
 *
 * @apiParam  {String} id Id of room
 * @apiParam  {Object} Room Room parameters
 * @apiParam  {String} Room.name Name of room
 * @apiParam  {String} Room.owner Owner of room
 * @apiParam  {String} Room.color Color of room
 *
 *
 * @apiParamExample {json} Request-Example:
 * Id: {
 *     "id": "5e4121eaea887b24fe85e275"
 * }
 *Body:
 *   {
 *       "name": "Room",
 *       "owner": "5e4121eaea887b24fe85e275",
 *       "color": "#432443"
 * }
 * @apiSuccess {Object} Room Room parameters
 * @apiSuccess  {String} Room._id Id of new room
 * @apiSuccess  {String} Room.name Name of room
 * @apiSuccess  {String} Room.owner Owner of room
 * @apiSuccess  {String} Room.color Color of room
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *{
 *       "_id": "5e4121eaea887b24fe85e275",
 *       "name": "Room",
 *       "calendarId": "calendar.google.com",
 *       "owner": "5e4121eaea887b24fe85e275",
 *       "color": "#432443"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Bad Request"
 *     }
 *      HTTP/1.1 404 Not Found
 *     {
 *       "error": "Room Not Found"
 *     }
 **/
/**
 * @api {get} /api/room Get all room
 * @apiName GetRoom
 * @apiGroup Room
 *
 * @apiHeader {String} access Users unique access token.
 * @apiHeader {String} refresh Users unique refresh token.
 *
 *  @apiHeaderExample {json} Header-Example:
 *     {
 *       "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzE2MWJkMWM5ZDQ0MDAwMDI3ZWVhMSIsIm1haWwiOiJzb21ib2R5QG1haWwuY29tIiwiaWF0IjoxNTgwMzk2MTk4LCJleHAiOjE1ODEwMDA5OTh9.yKH_lvbSJOpTGW5sEs0qxvzp-AOWuycshWNJcTPr1ZI",
 *       "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzE2MWJkMWM5ZDQ0MDAwMDI3ZWVhMSIsIm1haWwiOiJzb21ib2R5QG1haWwuY29tIiwiaWF0IjoxNTgwMzk2MTk4fQ.plqhqY9Icu3J1jr7vt2jb8GQiBoHqGhKw8b0aYD4ii0"
 *     }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *[{
 *       "_id": "5e4121eaea887b24fe85e275",
 *       "name": "Room",
 *       "calendarId": "calendar.google.com",
 *       "owner": "5e4121eaea887b24fe85e275",
 *       "color": "#432443"
 * },
 * {
 *       "_id": "5e4121eaea887b24fe85e275",
 *       "name": "Room",
 *       "calendarId": "calendar.google.com",
 *       "owner": "5e4121eaea887b24fe85e275",
 *       "color": "#432443"
 * }]
 *
 **/
/**
 *
 * @api {delete} /api/room/:id  Delete room
 * @apiName DeleteRoom
 * @apiGroup Room
 *
 * @apiHeader {String} access Users unique access token.
 * @apiHeader {String} refresh Users unique refresh token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzE2MWJkMWM5ZDQ0MDAwMDI3ZWVhMSIsIm1haWwiOiJzb21ib2R5QG1haWwuY29tIiwiaWF0IjoxNTgwMzk2MTk4LCJleHAiOjE1ODEwMDA5OTh9.yKH_lvbSJOpTGW5sEs0qxvzp-AOWuycshWNJcTPr1ZI",
 *       "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzE2MWJkMWM5ZDQ0MDAwMDI3ZWVhMSIsIm1haWwiOiJzb21ib2R5QG1haWwuY29tIiwiaWF0IjoxNTgwMzk2MTk4fQ.plqhqY9Icu3J1jr7vt2jb8GQiBoHqGhKw8b0aYD4ii0"
 *     }
 *
 * @apiParam  {String} id Id of room
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "id": "5e4121eaea887b24fe85e275"
 *     }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *   "n": 1,
 *   "opTime": {
 *       "ts": "6792123391416467460",
 *       "t": 21
 *   },
 *   "electionId": "7fffffff0000000000000015",
 *   "ok": 1,
 *   "$clusterTime": {
 *       "clusterTime": "6792123391416467460",
 *       "signature": {
 *           "hash": "Poyt5VihBkXNWu0/Fs0t4V5W3As=",
 *           "keyId": "6764753214106501121"
 *       }
 *   },
 *  "operationTime": "6792123391416467460",
 *   "deletedCount": 1
 *}
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Bad Request"
 *     }
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Room Not Found"
 *     }
 * */