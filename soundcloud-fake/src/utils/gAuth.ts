// import express, { Request, Response } from 'express';
// import { OAuth2Client } from 'google-auth-library';
// import { Url } from "url";

// const app = express();
// const port = 3000;

// /**
//  * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
//  * from the client_secret.json file. To get these credentials for your application, visit
//  * https://console.cloud.google.com/apis/credentials.
//  */
// const oauth2Client = new google.auth.OAuth2(
//   "752827926431-6n24u15f6k9al524t0j9hpa2bi24f4f9.apps.googleusercontent.com",
//   "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",
//   "http://localhost:3000/home"
// );

// // Access scopes for read-only Drive activity.
// const scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"];

// // Route to initiate OAuth2 authentication
// app.get("/auth/google", (req, res) => {
//   // Generate a url that asks permissions for the Drive activity scope
//   const authorizationUrl = oauth2Client.generateAuthUrl({
//     // 'online' (default) or 'offline' (gets refresh_token)
//     access_type: "offline",
//     /** Pass in the scopes array defined above.
//      * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
//     scope: scopes,
//     // Enable incremental authorization. Recommended as a best practice.
//     include_granted_scopes: true,
//   });

//   // Redirect the user to authorization URL using res.writeHead()
//   res.writeHead(301, { Location: authorizationUrl });
//   res.end();
// });

// // Callback route to handle the response from Google's OAuth2 server
// app.get("/home", async (req, res) => {
//   // Handle callback logic here
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// app.get('/oauth2callback', async (req: Request, res: Response) => {
//     const code = req.query.code as string;
//     const error = req.query.error as string;
  
//     try {
//       if (error) {
//         // Handle the error message gracefully
//         console.error('OAuth2 server responded with error:', error);
//         return res.status(400).send('OAuth2 server responded with error: ' + error);
//       }
  
//       if (!code) {
//         // If no authorization code is present in the response, return an error
//         console.error('OAuth2 server did not return an authorization code.');
//         return res.status(400).send('OAuth2 server did not return an authorization code.');
//       }
  
//       // Exchange authorization code for access token
//       const { tokens } = await oauth2Client.getToken(code);
  
//       // Use the tokens to make requests to Google APIs or store them for future use
  
//       // Redirect user to a success page
//       oauth2Client.setCredentials(tokens)
//       return res.redirect('/home');
//     } catch (error) {
//       console.error('Error retrieving access token:', error);
//       return res.status(500).send('Error retrieving access token');
//     }
//   });