/**
 * @api {post} /api/event Create new event
 * @apiName CreateEvent
 * @apiGroup Event
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
 * @apiParam  {Object} Event Event parameters
 * @apiParam  {String} [Event.title] Title of event
 * @apiParam  {String} [Event.message] Description of event
 * @apiParam  {String} Event.room Id of room
 * @apiParam  {String} Event.start Event start time
 * @apiParam  {String} Event.end Event end time
 * @apiParam  {Object[]} [Event.members] Invited members
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *       "title": "Just",
 *       "message": "164435",
 *       "room": "5e4121eaea887b24fe85e275",
 *       "start": "2020-03-11T12:30:00+02:00",
 *       "end": "2020-03-11T13:00:00+02:00",
 *       "members": [
 *                  {
 *                   "email": "calendar.google.com",
 *                   }
 *                  ]
 * }
 *
 * @apiSuccess {Object} Event Created event
 * @apiSuccess  {String} Event._id Id of new event
 * @apiSuccess  {String} Event.googleId Google id of new event
 * @apiSuccess  {String} [Event.title] Title of event
 * @apiSuccess  {String} [Event.message] Description of event
 * @apiSuccess  {String} Event.room Id of room
 * @apiSuccess  {Date} Event.start Event start time
 * @apiSuccess  {Date} Event.end Event end time
 * @apiSuccess  {Object[]} [Event.members] Invited members
 * @apiSuccess  {Date} Event.updated Time of event's updating
 *
 **/
/**
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *       "_id": "5e4121eaea887b24fe85e275",
 *       "googleId": "5e4121eaea887b24fe85fde275",
 *       "title": "Just",
 *       "message": "164435",
 *       "room": "5e4121eaea887b24fe85e275",
 *       "start": "2020-03-11T12:30:00+02:00",
 *       "end": "2020-03-11T13:00:00+02:00",
 *       "update": "2020-03-11T13:00:00+02:00",
 *       "members": [
 *                  {
 *                   "email": "calendar.google.com",
 *                   }
 *                  ]
 * }
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
 *
 *
 * @api {put} /api/event/:id Update new event
 * @apiName UpdateEvent
 * @apiGroup Event
 *
 * @apiHeader {String} access Users unique access token.
 * @apiHeader {String} refresh Users unique refresh token.
 *
 *  @apiHeaderExample {json} Header-Example:
 *     {
 *       "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzE2MWJkMWM5ZDQ0MDAwMDI3ZWVhMSIsIm1haWwiOiJzb21ib2R5QG1haWwuY29tIiwiaWF0IjoxNTgwMzk2MTk4LCJleHAiOjE1ODEwMDA5OTh9.yKH_lvbSJOpTGW5sEs0qxvzp-AOWuycshWNJcTPr1ZI",
 *       "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzE2MWJkMWM5ZDQ0MDAwMDI3ZWVhMSIsIm1haWwiOiJzb21ib2R5QG1haWwuY29tIiwiaWF0IjoxNTgwMzk2MTk4fQ.plqhqY9Icu3J1jr7vt2jb8GQiBoHqGhKw8b0aYD4ii0"
 *     }
 * @apiParam  {String} id Id of event
 * @apiParam  {Object} Event Event parameters
 * @apiParam  {String} [Event.title] Title of event
 * @apiParam  {String} [Event.message] Description of event
 * @apiParam  {String} Event.room Id of room
 * @apiParam  {String} Event.start Event start time
 * @apiParam  {String} Event.end Event end time
 * @apiParam  {Object[]} [Event.members] Invited members
 *
 * @apiParamExample {json} Request-Example:
 *  Id:
 *     {
 *         "id": "5e4121eaea887b24fe85e275"
 *     }
 *  Body:
 *    {
 *       "title": "Just",
 *       "message": "164435",
 *       "room": "5e4121eaea887b24fe85e275",
 *       "start": "2020-03-11T12:30:00+02:00",
 *       "end": "2020-03-11T13:00:00+02:00",
 *       "members": [
 *                  {
 *                   "email": "calendar.google.com",
 *                   }
 *                  ]
 * }
 *
 *
 **/
/**
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "n": 1,
    "nModified": 1,
    "opTime": {
        "ts": "6792202096692166662",
        "t": 21
    },
    "electionId": "7fffffff0000000000000015",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6792202096692166662",
        "signature": {
            "hash": "TUqz3pi3VCHCRk6FGESCQb8kXtQ=",
            "keyId": "6764753214106501121"
        }
    },
    "operationTime": "6792202096692166662"
}
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
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Event Not Found"
 *     }
 *
 * @api {get} /api/event  Get all events
 * @apiName GetEvents
 * @apiGroup Event
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
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * [{
 *       "googleId": "5e4121eaea887b24fe85fde275",
 *       "title": "Just",
 *       "message": "164435",
 *       "room": "5e4121eaea887b24fe85e275",
 *       "start": "2020-03-11T12:30:00+02:00",
 *       "end": "2020-03-11T13:00:00+02:00",
 *       "updated":"2020-03-11T13:00:00+02:00",
 *       "members": [
 *                  {
 *                   "email": "calendar.google.com",
 *                   }
 *                  ]
 * },
 * {
 *       "googleId": "5e4121eaea887b24fe85fde275",
 *       "title": "Just",
 *       "message": "164435",
 *       "room": "5e4121eaea887b24fe85e275",
 *       "start": "2020-03-11T12:30:00+02:00",
 *       "end": "2020-03-11T13:00:00+02:00",
 *       "updated":"2020-03-11T13:00:00+02:00",
 *       "members": [
 *                  {
 *                   "email": "calendar.google.com",
 *                   }
 *                  ]
 * }
 * ]
 *
 * */
/**
 *
 * @api {delete} /api/event/:id  Delete event
 * @apiName DeleteEvents
 * @apiGroup Event
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
 * @apiParam  {String} id Id of event
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
 *       "error": "Event Not Found"
 *     }
 **/
/**
 * @api {post} /api/event/sync Synchronize google events with database events
 * @apiName SynchronizeEvent
 * @apiGroup Event
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
 * @apiParam  {String} Owner Id of owner
 *
 *
 *
 *  @apiParamExample {json} Request-Example:
 *  Id:
 *     {
 *         "owner": "5e4121eaea887b24fe85e275"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 */