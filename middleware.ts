import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectRoute = createRouteMatcher([
  "/bookings(.*)",
  "/checkout(.*)",
  "/favourite(.*)",
  "/profile(.*)",
  "/rentals(.*)",
  "/reviews(.*)",
])


export default clerkMiddleware((auth,req)=>{
  if(isProtectRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};