const { withApiAuthRequired, getSession } = require("@auth0/nextjs-auth0");

export default withApiAuthRequired(function handler(req, res){
  // with this authorization, we can wrap around sensitive functions
  const session = getSession(req,res);

  const user = session.user;
  // things with logged in user goes here
  console.log(user)
  const body = req.body
    console.log(req)
    console.log(`body: ${body.id}`);
    // conditional, check form body

    if (!body) {
        return res.status(400).json({data: 'no body found . . .'})
    }

    // if successful
    res.status(200).json({data: ` ${body.id} `})
    
    /*
    Moreover, you can also attach this API to a database like MongoDB or Google Sheets. 
    This way, your submitted form data will be securely stored for later use. 
    For this guide, no database is used. 
    Instead, the same data is returned to the user to demo how it's done.
    */
})


/*
export default function handler(req, res) {
    const body = req.body
    console.log(req)
    console.log(`body: ${body.id}`);
    // conditional, check form body

    if (!body) {
        return res.status(400).json({data: 'no body found . . .'})
    }

    // if successful
    res.status(200).json({data: ` ${body.id} `})
    
    /*
    Moreover, you can also attach this API to a database like MongoDB or Google Sheets. 
    This way, your submitted form data will be securely stored for later use. 
    For this guide, no database is used. 
    Instead, the same data is returned to the user to demo how it's done.
    */

//}


