const { sentMail } = require('../utility/mail')

const getDay = date => {
  const dayOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleString('en-US', dayOption)
}
const getHour = date => {
  const hourOption = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  return date.toLocaleString('en-US', hourOption)
}

function createEventSentMail (event, roomName) {
  event.members.forEach((e) => {
    if (e.mail || e.email) {
      const mail = e.mail || e.email
      let title
      let message
      if (event.title) {
        title = `${event.title}`
        message = event.message
          ? `You are invited to ${event.title},
            where: ${roomName}, 
            when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)} 
            ${event.message}`
          : `You are invited to ${event.title},
           where: ${roomName}, 
           when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)}`
      } else {
        title = `Meeting in ${roomName}`
        message = event.message
          ? `You are invited to event
           where: ${roomName}, 
           when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)} 
           ${event.message}`
          : `You are invited to event
           where: ${roomName}, 
           when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)}`
      }
      sentMail(title, message, mail)
    }
  })
}
function updateEventSentMail (event, roomName) {
  event.members.forEach((e) => {
    if (e.mail || e.email) {
      const mail = e.mail || e.email
      let title
      let message
      if (event.title) {
        title = `${event.title} has been changed`
        message = event.message
          ? `${event.title} has been changed, 
            where: ${roomName}, 
            when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)}  
            ${event.message}`
          : `${event.title} has been changed, 
            where: ${roomName}, 
            when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)}`
      } else {
        title = `Meeting in ${roomName} has been changed`
        message = event.message
          ? `Current event has been changed,
            where: ${roomName}, 
            when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)}  
            ${event.message}`
          : `Current event has been changed, 
             where: ${roomName}, 
             when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)}`
      }
      sentMail(title, message, mail)
    }
  })
}
function deleteEventSentMail (event, roomName) {
  event.members.forEach((e) => {
    if (e.mail || e.email) {
      const mail = e.mail || e.email
      let title
      let message
      if (event.title) {
        title = `${event.title} canceled`
        message = event.message
          ? `${event.title} canceled: 
            where: ${roomName}, 
            when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)} 
            ${event.message}`
          : `${event.title} canceled:
            where: ${roomName}, 
            when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)}`
      } else {
        title = `meeting in ${roomName} canceled`
        message = event.message
          ? `Current Event canceled: 
           where: ${roomName}, 
           when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)} 
           ${event.message}`
          : `Current event canceled:
            where: ${roomName}, 
            when: ${getDay(event.start)}| ${getHour(event.start)}-${getHour(event.end)}`
      }
      sentMail(title, message, mail)
    }
  })
}
exports.createEventSentMail = createEventSentMail
exports.updateEventSentMail = updateEventSentMail
exports.deleteEventSentMail = deleteEventSentMail
