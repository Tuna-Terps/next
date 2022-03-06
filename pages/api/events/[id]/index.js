// declare a function for the event object, 
//here we dynamically route to the requested event to path api routes

export default function getEventById(req, res) {
    console.log('[function - api ] getEventById')
    console.log(res.json({byId: req.query.id, method: req.method}))
    res.json({byId: req.query.id, method: req.method, message: 'getEventById'})

}