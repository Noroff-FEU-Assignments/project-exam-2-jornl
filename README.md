# Noroff Online 
Social media for students at Noroff School of technology and digital media.

## Installation
Clone the repo to a local folder with the command:
`git clone https://github.com/Noroff-FEU-Assignments/project-exam-2-jornl.git`

Cd into the directory
`cd project-exam-2-jornl`

Install npm dependencies
`npm install`

Start the server
`npm run dev`

## Summary

In this assignment we're tasked with creating a new frontend for an existing Social Media company. This company has a list of requirements, but the design and user experience is fully up to me.

I try to use what we've learned about development, WCAG, design and frameworks during these 4 years at Noroff school of technology and digital media. 

Overall I am very happy with how this project turned out. My only complaints are that the API and its documentation feels rushed, it's not as smooth and logical as I would have wanted it to be. 

## Requirements
The company's requirements is as follows:

### Features
1. Only a user with stud.noroff.no email may register.
2. A registered user can login, and out.
3. A registered user can update their avatar and banner images.
4. A registered user can view a list of Posts
5. A registered user can create, read, update and delete (CRUD) a Post
   1. The user can view a single Post by `id`
   2. The user can comment on any Posts
   3. The user can react to any Posts with an emoji
6. A registered user can view a list of Profiles
   1. The user can view a single Profile by `name`
   2. The user can follow or unfollow a Profile

### Technical Restrictions
I must use an approved JavaScript Framework:
* **React**

Not much choice here, even though React is a Library and not a Framework.

Quote from react.dev:

*You can definitely use React without a framework—that’s how you’d use React for a part of your page. However, if you’re building a new app or a site fully with React, we recommend using a framework.*

I must use an approved CSS Framework:
* **Bootstrap**
* Tailwind
* MUI
* Styled Components
* CSS Modules

As for the CSS, I know Bootstrap and Tailwind well. But since bootstrap is a bit faster (in my opinion), and really easy to customize when working with it in sass. I chose to use it over the others.

### Static Hosts
* Github Pages
* **Netlify**

I haven't used either of these before, so I tested both of them and there were *difficulties* with both.

When trying Github Pages I got a url, which returned a blank page. And navigating to other pages gave me a 404. Guessing it has something to do with this being an SPA (single page application), same as mentioned below with Netlify.

I eventually got Netlify working. Had to create a [netlify.toml](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps) file, to redirect all requests after / to index.html.

### Design Applications
* **Adobe XD**
* Figma
* Sketch

I have used Adobe XD for multiple assignments and projects. Never tested either Figma or Sketch. So this choice was pretty easy, Adobe XD.

### Planning Applications
* Trello
* **Github Projects**

I have used Trello at work, with a vendor. Didn't like it. So I tested Github Projects - wow! It was so awesome that I started using it for personal and other work projects. So I chose to use Github Projects.

## Planning

Starting out, since I hadn't used Github Projects before, I had to test it and google some functionality to get it to where I wanted it. 

For instance Group by "Stage", I first created a text field called stage. But I couldn't select it from a dropdown, which I wanted to do. So I looked at how the "Status" field (default in projects) were made, and copied it over to stage. Turns out you can even have different colors on the different stages. Which makes it easier to understand at a glance.

I divided the project up into 6 stages; 
1. 01 - Planning
2. 02 - Research
3. 03 - Designing/Prototyping
4. 04 - Testing
5. 05 - Development
6. 06 - Delivery

Then added tasks to each stage, which I will explain further below.

### 01 - Planning
I always start a project by reading the assignment text a couple of times. Then *really* reading it, and [taking notes on keywords](https://github.com/users/jornl/projects/2/views/4?pane=issue&itemId=25203187) in the assignment text.

In this assignment I then I setup the Github Project, and started learning (by doing) how to use it (the basics). Then I added tasks to the project, where I tried to estimate how much time each task would take. 

I set up the tasks in the order I thought would be the most effective. Grouped `Posts` tasks together, but decided to move comments and reactions down the list - since I probably oversimplified it in my head, and overcomplicated some `Profile` tasks. 

### 02 - Research
Since this assignment is using an unknown (to me) API, I had to read up on which response is returned on which request. Even though the documentation isn't always correct.

And example of where the documentation is incorrect is the returned `_count`, specifically `reactions`, returns the number of unique emojis, not the number of reactions. So you could have gotten 100 👍 and 1 👌 the `_count` value would be 2, not 101. There is more examples, but I guess it presents a chance to learn. 😉

Reading the API documentation made me realize that my tasks were out of order. Because it is much easier to update the Avatar and Banner when it is a string and not an uploaded image. I didn't reorder them though, as I just worked on what I felt like. 

Target audience? I am one of them. 

### 03 - Designing/Prototyping
I headed over to [Adobe Color](https://color.adobe.com), and started playing with the different modes. But the result was always too colorful for my taste. So I made a custom rule with 5 colors, almost black, white, a dark teal, orange and blue. Though the blue weren't used in this project.

Then I started thinking about fonts. These I took nice looking fonts, which has a good screen readability. Roboto Slab for headers, and Poppins for all other text. 

I created the logo in Adobe Illustrator, by placing a white "n" on a circle with a black background and turned it a few degrees forward. I think it looks cool even if it was really easy.

Next I was ready for designing the Project, so I went into Adobe XD and started sketching a mobile design. I completely skipped the front page/welcome page for too long so the users in my user test got a kind of rushed page. But I got feedback that it felt dull, so I added an image to it in the final design (web version). After I was happy with the mobile version, I created a desktop version. I used many of the existing elements, and I even tried using components with different states. **States are hard**, thats why some menu items show a different title on hover, or on click. I figured I got my vision projected out to the users, and I just fixed any issues in the web version.

As mentioned I did some user testing of the prototypes - though I only got 1 out of 4 replies on the mobile and desktop design. 

### 04 - Testing
#### User testing design/prototype
My questions to the users:

```
Hello!

I am working on a project exam and have been tasked with creating a frontend for an existing social media platform (similar to Facebook) for the students at Noroff. In that regard, I would appreciate it if you could review these pages critically:

Desktop/Large screen:
https://xd.adobe.com/view/dd2c13e7-6d29-4526-b456-f5cb8597ab05-887f/?fullscreen&hints=on

Mobile/Small screen:
https://xd.adobe.com/view/af98399f-f371-4bab-9f25-fda2b517622c-facb/?fullscreen&hints=on

(Some links may not work, but please disregard that - this is just a visualization of the final product.)

1. Is there anything that seems difficult?
2. Is there anything that is unclear?
3. Is there anything missing in the design?
4. Is the design easy to understand? Or is there too much noise (too many elements)?
5. Do you find the page easy to navigate, or would you do something differently?

Finally, if you have a suggestion for the app name, please feel free to send it! :-D
```

The response I got:

```
Mobile:
The login page is a bit dull. It could use more color or a larger logo/image to liven it up.

The registration process is simple and understandable. It should include password requirements (strength), though.

The My Profile page is very clean and neat. Nice design with good spacing between elements.

"Profiles" and "My Profile" can be confusing. Maybe "My Profile" could be named something else, like just "Me."

The Latest Post section works very well. Easy to read, and the individual posts are nicely boxed, which works great in my opinion.

In the Latest Users section, it's somewhat difficult to understand what the number to the right of the name represents. For example, where it says 15 next to the first person - is it the number of posts or friends displayed there?

It's easy to navigate between the different menu options. Perhaps there could be a "Home" function that appears consistently on all pages? (But maybe the black "N" is intended to serve that purpose? - which would work well.)

Desktop:
The options on the desktop version are not the same as on the mobile version. It's something to consider that the two pages should function in the same way to maintain consistency.

I like the profile page when you first enter it, clean and tidy, with the images at the top. It works well.

The "Posts" section should have the same name as in the mobile version.

I think the font size becomes somewhat small in the desktop version. It would be smart to increase it slightly to both fill the screen more and make it more readable.

The white background works very well.

It's not possible to scroll down the pages, but I assume that's because this is a test version.
```

After getting the response I analyzed what the user was saying, what the user wanted me to change. With that in mind I moved on to Development.

### 05 - Development
I first started with a "Setup" task, which consists of cloning the repository and initializing a react (via Vite) in the folder. Create a logical folder structure, which I based loosely on [this article by Web Dev Simplified on Youtube](https://blog.webdevsimplified.com/2022-07/react-folder-structure/). Created a new README.md, and moved the old README.md to a new File called ASSIGNMENT-README.md, so I'd still have the assignment text. 

Vite doesn't allow you to initiate into a folder with files already existing, so I had to do some trickery to get it working. Created an empty subfolder, ran the command `npm create vite@latest my-vue-app -- --template react`. Then I just cut everything into the parent folder. All set to start developing!

Then I installed a few npm packages:
1. bootstrap
2. react-bootstrap
3. sass
4. react-router-dom
5. react-reactions (which later got removed, twice)
6. react-hook-form
7. date-fns
8. prop-types
9. axios
10. fontawesome
11. yup

Added AuthContext, and useLocalStorage-hook, a few routes in the router, and some Utility components (AlertBox, Header, and LoadingIndicator).

I added every user story from the assignment as a task, which made it easy for me to keep track of where I was and what was coming up next in the project.

I customized bootstrap to the projects needs, then moved on to the Layout and Navigation components, I do this so I only have to change Links, or other general stuff in one place. 

Some of my components have moved many times since first creating them, because I thought I had a fancy way of including them. But I couldn't get it working as I wanted. For instance did you know that ESLint doesn't let you use `useEffect()` in a react functional component called index? I didn't, so I had to rename it to something more describing. I was trying to use the index.jsx in a folder (for example `/pages/Posts`) to do all the requests and pass the API response as props to children-components.

The thing I am most happy with in this project is my Reactions component. I think it turned out great. The ability to add or remove emojis in a single file `/data/emojis.json`, is a feature I would appreciate as a developer working on this project in the future.

Some improvements I wish the API had:
* Included a user_id on the reactions, limiting users from clicking 👍 1 million times on a post. 
* Logging the user in after registering.
* Profiles should have had a created field, to display when the user registered.
* Ability to filter and search for profiles.
* Upload banner and avatar images.

### 04 - Testing
#### User testing web design
My questions to the users:

```
Hi,

I have now published this page on the internet and consider myself finished with the task. However, I would like you to provide feedback as an independent third party for this project. I hope you have the opportunity to take a look and provide a critical (and constructive) feedback on the website.

According to the task, we should fulfill these criteria:

A user with a stud.noroff.no email address should be able to register.
A registered user should be able to:
Log in and log out.
Update their own avatar and banner.
See a list of posts.
See a list of profiles.
View an individual post.
View an individual profile.
Create a post, update it, and delete it.
Comment on posts.
React to a post with an emoji.
Follow/unfollow another profile.
I understand that you may not have time to test all the features, but it would be great if you could test some of them and provide feedback on:

Usability: Is it easy to navigate and understand what needs to be clicked?
What do you think about the colors and appearance of the page?
Any other feedback you would like to provide?
You can either create your own user or use one of the test users that I have created:
Username: jorn.usertest@stud.noroff.no
Password: 12345678

Note: The profiles and posts have been created by other students, so I unfortunately cannot control the content of those. However, I have created an avatar and banner image that will appear for those who haven't added them to their profile.

Link to the page, it should work on all types of devices: https://project-exam2-jornl.netlify.app/

```

This time I got 3 out of 4 responses. Though only 1 of them were usable for further development.

```
User 1: 
Very user-friendly and easy-to-use page. Easy to navigate.

Nice colors. Perhaps the header is a bit dull (?)

User 2:
I think it worked very well. I visited other people's profiles, the login process went smoothly, I was able to write and use emojis, and I could follow and unfollow without any issues. 

User 3:
I like the homepage, very neat. It's nice to have a background image showing students, and there's a clear distinction between the login and register new account sections. However, should the buttons have had the same color?

The initial impression is that this is a serious website.

Once I have registered, I would prefer to be taken to my own page instead of having to log in again.

The 'Latest Post' page is well-organized. I like that it displays the time each post was made (number of hours ago). It's easy to leave comments and 'likes.'

Should there be a standard size for images in the posts?

It's easy to follow/unfollow profiles. I like the 'Unfollow' button with a strike-through on the person.

On my profile, I can see how many people I follow, but not who I follow. I can see that I'm following 1 person, but I don't know which profile it is.

It would be great if there was a search function for profiles.

The profile page is very good. Very organized with the image at the top, name in the middle, and so on. It's easy to see where to edit one's own profile. That part is excellent.

It was a bit difficult to find where to click to add a new post. The distinction between 'Latest Posts' and 'Create New Post' needs to be clearer. They are very close together and in almost the same color. It's hard to differentiate between them.

The colors with a white background work well. They make it easy to read and provide a clear overview with the frames that are there.
```

It's easy to see who the real MVP of this project really is. User 3, thank you very much!

I reworked the features mentioned in the feedback, though I gave up on trying to login directly after registering.

### 06 - Delivery
In the delivery section I only have 2 tasks, one is to create a style guide and the other is delivering the project.

I created 9 pages explaining how to style the project future developers, and I think it's an OK style guide. Not my favorite thing to do, but it's necessary for the styling of the project.

As for delivery I only have to complete this README and submit it to github, then I am done with the assignment. Apart from a few lines of refactoring coming later in the summer, maybe. As I learn more about react in my spare time.

## Resources

- [API documentation](https://noroff-api-docs.netlify.app/social-endpoints/)
- [Vite documentation](https://vitejs.dev/guide/)
- [React Bootstrap](https://react-bootstrap.netlify.app/)
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [FontAwesome](https://fontawesome.com/)
- [Default Avatar Image](https://fontawesome.com/icons/circle-user?f=classic&s=regular)
- [Default Banner Image](https://unsplash.com/photos/Qe3kgY98OXs)
- [Welcome page background image](https://unsplash.com/photos/QckxruozjRg)