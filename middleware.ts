// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// // import { pathToRegexp } from "path-to-regexp";

// // export function middleware(request: NextRequest) {

// //   const authenticated = window.localStorage.getItem("authStatus")
// //     if (authenticated == "1")
// //       return NextResponse.redirect(new URL("/home", request.url));
// //     else{
// //       return NextResponse.redirect(new URL("/auth/login", request.url));
// //     }
// // }

// // // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/home",
// };

// // // const regexp = pathToRegexp("/home")

// // // export const config = {
// // //   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// // //   matcher: regexp,
// // // };

// import { NextRequest, NextResponse } from "next/server";

// let isAuthStatusOne: boolean;

// export async function middleware(request: NextRequest) {
//   // Check if it's a POST request
//   if (request.method === "POST") {
//     const contentType = request.headers.get("content-type");
//     // Check if it's a JSON request
//     if (contentType && contentType.includes("application/json")) {
//       try {
//         // Parse the request body as JSON
//         const body = await request.json();
//         // Check if the body contains the expected data
//         if (body.authStatus === "1") {
//           // Set the variable to true
//           isAuthStatusOne = true;
//           // Perform logic for valid POST request
//         } else {
//           isAuthStatusOne = false;
//         }
//       } catch (error) {
//         console.error("Error parsing request body:", error);
//       }
//     }
//   }

//   if (isAuthStatusOne == true) {
//     return NextResponse.redirect(new URL("/home", request.url));
//   } else if (isAuthStatusOne == false || isAuthStatusOne == null) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }
//   // Perform logic for other cases (non-POST or invalid POST request)
// }

// // Function to check if any past POST request had authStatus = "1"
// export function hasAuthStatusOne(): boolean {
//   return isAuthStatusOne;
// }
