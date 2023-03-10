import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  const email = 'raju@remix.run'

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const hashedPassword = await bcrypt.hash('rajuiscool', 10)
  await prisma.user.create({
    data: {
      email,
      firstName: 'Raju',
      lastName: 'Khattri',
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })

  const blogs = [
    {
      slug: 'how-to-setup-pc-like-code-editor-for-android',
      title: 'Code Editor for Android',
      subtitle: 'How to setup PC like code editor for android.',
      markdown: `
## Prerequisite

Should know how to use [Neovim](https://neovim.io).

To set up a PC-like code editor for Android, we'll be using the following tools:

- Termux
- Termux Styling
- Nvim
- LazyVim
- Fish

## Installing Termux and Termux Styling

To install Termux and Termux Styling, visit the F-Droid website. If you don't care about styles, you can download it from the Play Store. Termux Styling is also available as a paid app on the Play Store.

Here are the link for both the apps:

| Provider | Termux | Termux Styling |
| --- | --- | --- |
| Playstore | [Download](https://play.google.com/store/apps/details?id=com.termux) | [Download](https://play.google.com/store/apps/details?id=com.termux.styling) |
| F-Droid | [Download](https://f-droid.org/en/packages/com.termux) | [Download](https://f-droid.org/en/packages/com.termux.styling) |

> If you install Termux from the Play Store, make sure to also download and install Termux Styling from the Play Store. Otherwise, the app will not install due to a signature mismatch. The same applies to F-Droid.
> 

## Setting up Termux

The first step is to give storage access to Termux. Open the Termux app and type the following command:

\`\`\`bash
termux-setup-storage
\`\`\`

After running the command, a prompt will appear. Click "Allow" to grant access.
You can also grant access to Termux from its app settings.

### Update and Upgrade

To update the installed packages and upgrade the system, use the following command:

\`\`\`bash
apt update && apt upgrade
\`\`\`

## Styling Termux

Firstly, open the Termux application and hold your finger on the screen for a few seconds. This will reveal a "MORE..." option. Click on it to access additional options, and then select "Style". You will be presented with two options: choose the color or font that you prefer.

### **Custom Styling**

Customize the color scheme:

I'll be using *[catppuccin](https://github.com/catppuccin)* theme for Termux as it provides excellent support and features beautiful shades. To install it, please refer to catppuccin's installation guide [here](https://github.com/catppuccin/termux) or use the following command:

\`\`\`bash
curl -o $HOME/.termux/colors.properties https://raw.githubusercontent.com/catppuccin/termux/main/Mocha/colors.properties
\`\`\`

Reload settings, \`termux-reload-settings\` or just open new session.
You can create your own color scheme by editing the \`colors.properties\` files.

Customize the fonts:

I'll be using *nerd fonts*, it provide icons with fonts as default termux fonts dosent supports icons.

Here are the steps to use nerfont

1. Visit [nerdfonts.com](https://nerdfonts.com/) and download your favourite font.
2. Unzip it.
3. You can find downloaded font inside \`~/storage/downloads\`.
4. Now you will see lots of .ttf and .otf file, choose any *.ttf* font and move it into \`~/.termux\` directory.
    
    \`\`\`bash
    mv my-favorite-font.ttf ~/.termux/font.ttf
    \`\`\`
    
5. Reload settings, \`termux-reload-settings\` or just open new session.

> The font name should be font.ttf and extension should be .ttf
> 

## Setting up Terminal and Code editor

### Install useful packages

[Git](https://git-scm.com), [Nodejs](https://nodejs.org), [GitHub CLI](https://cli.github.com)

\`\`\`bash
pkg install git
pkg install nodesjs -y
pkg install gh
\`\`\`

### Install Pnpm

If you care about storage then I recommend you to use pnpm here's [why](https://pnpm.io/pnpm-vs-npm)?

\`\`\`bash
corepack enable
corepack prepare pnpm@latest --activate
\`\`\`

### Install fish

Why fish? [Check out](https://www.makeuseof.com/tag/x-reasons-install-fish-shell/)

\`\`\`bash
pkg install fish
fish
\`\`\`

### Install neovim & LazyVim

\`\`\`bash
pkg install neovim
git clone https://github.com/LazyVim/starter ~/.config/nvim
rm -rf ~/.config/nvim/.git
nvim
\`\`\`
      `.trim(),
    },
    {
      slug: 'building-a-likes-api-with-google-cloud-functions',
      title: 'Building a Likes API With Google Cloud Functions',
      subtitle:
        'Learn how to use Google Cloud Functions to build a likes API with Node',
      markdown: `
I took the challenge to build a likes button into this blog. Since the site is
compiled and then deployed as flat files, there is no backend or database to
manage. From a security aspect, there is no safer way to develop a website, but
it does add a bit of complexity to incorporate dynamic content.

My first attempt was to add Firebase as a dependency and wire it up to the likes
button. This worked great as it gave me real-time updates across multiple
browser sessions whenever I clicked the button. However, looking at the
compiled, minified bundle, I noticed it had added over 220 KB!

With that in mind, I don't think the trade-off for that much code for such a
simple likes button makes any sense. This led me to explore other options and
decided that cloud functions might be a great fit for this. I've seen coworkers
use AWS lambda functions for various things, but I've never had to the
opportunity to try them out myself. The thought of using cloud functions excited
me since I get the benefits of an API server, without managing an API server.

## Planning the API

The API is reasonably straightforward if you think roughly how the user
interacts with a like button. Let's break this down into user stories.

1. As an anonymous user, I want to see the total likes count next to the likes
button.
1. As an anonymous user, when I click the likes button, it should increment the
count by one.

Based on those two user stories, we can create two endpoints to satisfy the
requirements. First, we need to fetch the current count for a specific post
using a GET request. Secondly, update that count by one or create a new document
using a PUT request.

## Building the Cloud Function

Lets first start with some of the boilerplate. We'll create a new directory and
create an index file which can house our function. In the root folder of this
project run the following commands:

\`\`\`sh
mkdir -p functions/likes && \`# Create a new directory called functions/likes\` \
cd functions/likes &&     \`# Move into the new directory\` \
touch index.js &&         \`# Create a new file called index.js\` \
npm init -y               \`# Create a basic package.json file without any configuration\`
\`\`\`

Next, you'll need to install some of the project's dependencies. For this cloud
function, I have chosen to install Express, Firebase admin and the Firebase
functions packages by running the following \`npm\` install command:

\`\`\`shell
npm install express firebase-admin firebase-functions
\`\`\`

Alternatively, if you prefer [yarn](https://yarnpkg.com):

\`\`\`shell
yarn add express firebase-admin firebase-functions
\`\`\`

That takes care of the project's dependencies and the now for actual function.
Open up \`index.js\` and insert the following boilerplate:

\`\`\`javascript
// index.js
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')

// Creates an express application which handles the routing
const app = express()

// Initialize the firebase configuration. Since you this is already hosted
// on Google Cloud, you don't need any additional configuration. It just
// works!
admin.initializeApp(functions.config().firestore)

// This is the main entry point to the function
exports.likes = functions.https.onRequest(app)
\`\`\`

This is a bare-bones function and doesn't do much at this point. We are
importing a few required packages, configuring the Firebase connection, and then
spinning up an Express server to handle each request. If you were to deploy this
as is and make a request to the functions endpoint, you would get back an \`OK\`
message from Express.

### Configuring the Routes

#### GET a Document

Starting with the GET request handler, let's try and think for a second what
this endpoint is going to do. A request from the client hits the Express server
and then matches a specific route. The route needs to include the post ID to
identify which document to query from the database. One caveat here is if the
document doesn't exist, we should return a default count instead of returning a
404 not found error.

\`\`\`js
// Reference the firestore database and store it in a variable so we can use it across both functions
const db = admin.firestore()
// Reference the likes collection within the firestore database
const likes = db.collection('likes')

app.get('/:id', (req, res) =>
likes
.doc(req.params.id)
.get()
.then((doc) => {
if (!doc.exists) {
res.status(200).json({count: 0})
} else {
res.status(200).send(doc.data())
}
}),
)
\`\`\`

We are using the [Express routing](https://expressjs.com/en/guide/routing.html)
parameters to match the ID. For those not familiar with Express routing, \`:id\`
is just a variable I defined to match any value included in the route. It then
becomes accessible under the request object \`req.params.id\`.

The request comes in; we'll look up a specific document in the likes collection
using the ID. The Firebase API returns an \`exists\` property we can use to check
if the document was previously in the collection. If the document exists, return
the data by calling \`doc.data()\` or return a default value of zero.

#### Put to Create or Update a Document

Without knowing much about the Firebase API, some developers may make the
mistake of fetching a document using the \`get\` method and then calling \`set\` to
increment the value.

\`\`\`js
// DON”T DO THIS
likes
.doc(req.params.id)
.get()
.then((doc) => {
const count = doc.exists ? doc.data().count + 1 : 1
likes.doc(req.params.id).set({count})
})
\`\`\`

Instead of calling \`get\` and then \`set\`, fetching and updating a value or
creating a new document altogether should be handled by using transactions.
Transactions allow you to read the document and then update an existing value
while guaranteeing that you are incrementing the latest value.

\`\`\`js
const put = (req, res) =>
db
.runTransaction((transaction) =>
transaction.get(likes.doc(req.params.id)).then((doc) => {
const count = doc.exists ? doc.data().count + 1 : 1
const method = doc.exists ? 'update' : 'set'
transaction[method](likes.doc(req.params.id), {count})
return Promise.resolve(count)
}),
)
.then((count) => res.status(200).json({count}))
.catch((error) =>
res
.status(500)
.json({status: 500, message: 'Failed to update count', error}),
)
\`\`\`

Let's take this line by line since a lot is going on here. First, we start a
transaction against the database and then get the current document by ID.
Firebase returns an object containing two main properties, exists and data. If
the document exists, we'll increment the current count by one or return a
default value of one. Again, if the document exists, we'll have to call the
transaction update method to update the existing value. If the document does not
exist, call set instead.

#### Set vs Update

Knowing when to call set over update is important since set overwrites the
existing document entirely. Calling \`update\` only updates the values you pass
in. Take a look at the following example:

\`\`\`js
doc.set({active: true, count: 1})
doc.set({count: 2})
//=> { count: 2 }
\`\`\`

\`active: true\` would be removed entirely. You can see how this would be a
problem if your object contained more than just \`count\`. Instead, calling
\`update\` would only update the \`count\` and leave \`active\` intact.

\`\`\`js
doc.set({active: true, count: 1})
doc.update({count: 2})
//=> { active: true, count: 2 }
\`\`\`

## Deployment

Now to test out this code in production! You need to have the
[gcloud](https://cloud.google.com/sdk/gcloud/) CLI tools installed locally to
run any of the deployment commands.

\`\`\`sh
gcloud functions deploy likes \`# likes is the name of the Google Cloud Function\` \
--entry-point likes         \`# Is referring to the exported module \`exports.likes\` \
--runtime nodejs8           \`# Use the Node 8 runtime\` \
--trigger-http              \`# Since this is an API, an HTTP request triggers this function\` \
--source ./likes            \`# The directory of the likes button\` \
--project devin-schulz      \`# The name of the project you are deploying. May not be required\`
\`\`\`

Once complete, you should get back a payload containing all the necessary
information about your function. Look for \`httpsTrigger.url\`, this is the
endpoint you need to hit to invoke the function. In my case, the URL I get back
is \`https://us-central1-devin-schulz.cloudfunctions.net/likes\`.

Now to create a document, we can use a CURL request to hit the endpoint.

\`\`\`shell
curl -X PUT https://us-central1-devin-schulz.cloudfunctions.net/likes/32779e118e414d84746d8775451f6de8
\`\`\`

Furthermore, to return the count:

\`\`\`shell
curl https://us-central1-devin-schulz.cloudfunctions.net/likes/32779e118e414d84746d8775451f6de8
\`\`\`

## Conclusion

There you have it, a small single cloud function that acts as an API server to
read and write post likes to a database. All without having to bloat the client
and load the entirety of Firebase for such simple functionality.

This was my first time experimenting with cloud functions, and I think they have
the potential to enhance the overall developer experience when it comes to
creating easy CRUD operations or form submissions. I'll be incorporating them
into more and more side projects and experiment with the
[serverless](https://serverless.com/) framework in the future.

You can view the source of the function on
[Github](https://github.com/devinschulz/blog/blob/master/functions/likes.js).
      `.trim(),
    },
  ]

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog,
    })
  }

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
