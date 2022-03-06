// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { withApiAuthRequired, getSession } = require("@auth0/nextjs-auth0");

export default withApiAuthRequired(function ProtectedRoute(req, res){
  // with this authorization, we can wrap around sensitive functions
  const session = getSession(req,res);

  const user = session.user;
  // things with logged in user goes here
  console.log(user)
})