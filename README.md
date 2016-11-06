##This project was awarded an MLH Finalist Medal at HackNJIT2016.





## Inspiration
After seeing the hard work that goes into running a Hackthon, our team was inspired to give back to the hacker community by creating a fullstack webapp that makes running a Hackthon event a little easier.

## What it does
Our app, HackOrg, allows students to create a password and sign up for an event with their email address. Upon registration, the students complete a submission form that collects key information like their name, photo, college, github link, and resume link. Upon arriving to the event, the student signs in to the app which pulls up their name, profile picture, and an entry QR code. This is then checked by event administrators to confirm their check in. Throughout the event, the students use their QR codes to get meals and (in future editions) rent out hardware.

## How we built it
The app's front-end is built with Bootstrap and Handlebars.js, and the back-end uses node.js. The server-side node packages include express.js, passport.js, and mongoose.js. All data is stored in a MongoDB database, and the QR is made with a simple API found at http://goqr.me/api/doc/create-qr-code/.

## Challenges we ran into
The biggest challenge of the project was tackling the user sign-in feature in passort.js. Our team has not yet covered user authentication in our bootcamp, so we needed to teach it to ourselves throughout the night.

## Accomplishments that we are proud of
For both members of our team, Steve and Tom, this was our first Hackathon were we stayed up through submission. We are proud to have a working project which uses a technology (passport.js) that we taught ourselves.

## What we learned
User authentication is a critical component in cyber security, and our team is proud to have been able to learn how to apply it to our app at this event.

## What's next for HackOrg
The next steps for HackOrg are a more refined administrator sign up process and an option to track hardware rentals at the Hackathon. We believe that a refined hardware rental process can improve student experience. Our plan is to have a timed session, where users will receive a text when it is time to bring back their device to the admins so that another team can rent it. 

##Screenshots

Landing Page for HackOrg

![homepage](/images/homepage.png)

Profile Page
![profilepage](/images/profile.png)

Profile Page QR Section
![profilepageqr](/images/profileqr.png)

Admin View- This is the Profile page screenshot from above, viewed as an admin. Note the additional options.
![adminview](/images/adminoptions.png)
