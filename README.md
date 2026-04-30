# WARNING

This git repo is still a work in progress and has no official release build yet. The code is all functional but the organization and deployment of various data files and objects is in a phase of transition to a new model. Continue reading to learn more!

## What does that mean and what is this repo for?

This means you can pull this code right now and all of it will "work", but it is not properly structured since some of the code is on the new model while some is on the old model. Therefore this repo is "unstable" in a sense. As for what this repo is? It is the Rich Deployment (RD) version of Asveora. Aka the full Asveora project. This contains all of the building blocks necessary to deploy the full Asveora experience and or begin the construction of your own digital network. Whether you are looking to build profiles, search indexes, dashboards, wiki pages, blog posts, or storefront pages, all of it can be done with the code in this repository. We recommend that you start small with something such as building a nice profile space for yourself and then scaling up to larger creations such as marketplaces, landhubs, systems, federations, or your own full-blown digital network.

## I just want to be an user and not a contributor...

Head over to https://www.asveora.social/p/join.html and start having fun! It is expected that most users of Asveora will become contributors at some point in due time. Why so? Because Asveora is a self-deployable project. The more you do yourself, the more options, customization, and freedom you gain. However if you are just starting out with Asveora it is understandable if you do not want to immediately jump into deploying the RD version of Asveora. It is recommended that you go find an existing wheelcore to join, have the wheelcore admin get you set up with Quick Deployment (QD) and then slowly start taking control of your Asveora presence as you become more familiar with computers, networking, and web development. Yes, even smarpthones are computers!

## Why would I bother using something like this?

Easiest life-long way to break away from centralized social media platforms and ecosystems such as FaceBook, X, Instagram, Reddit, Pinterest, Flickr, etc. Everything you build with Asveora is yours to keep, move, delete, etc. No one controls your presence, data, and where they belong but you. Not only will it greatly improve your tech literacy, but it will also enable you to build your own online digital networks, storefronts, portfolios, blogs, news feeds, fan pages, etc. You get to decide what domain registrars, protocols, email services, file hosting services, content management systems, etc. you use. All of your code, assets, and projects stay with you locally and you decide where you display them on the internet. Asveora was built to give people more freedom with how they exist online and highlight just how incredibly crucial tech literacy is. Many people are not tech literate in an age where many parts of their lives are directly reliant upon digital technology. This is dangerous and needs to change. Why? Because situations like the following are all too common:

* Discord IDs Leaked (2025): https://www.bbc.com/news/articles/c8jmzd972leo
* Meta & YouTube Lawsuit (2025): https://www.yahoo.com/news/articles/meta-youtube-lose-social-media-175400791.html
* Meta Scam Ads Lawsuit (2026): https://mashable.com/article/meta-accused-of-profiting-from-scam-ads-in-class-action-lawsuit
* Reddit API Protests (2023): https://apnews.com/article/reddit-blackout-api-91f60aaec2eaf7cd0e3751e2fb3dd653

## How do I get help if I need it?

Check the GET-HELP.txt file! :)

## How do I clone this repo and begin contributing to Asveora?

*Contribution guidelines will be coming at some point!*

First, you will want to install the following on your system:

* git
* node.js
* express.js
* An IDE such as Notepad++ or Microsoft's Visual Studio Code (aka VSC or VS Code)

Keep in mind that you install express once you have node.js with the `npm install express` command in terminal.
If you do not know how to use git or node.js then please refer to the following guides:

* git: https://github.com/git-guides
* node: https://nodejs.org/learn/getting-started/introduction-to-nodejs

I would highly recommend first familiarizing yourself with how system environment variables are handled on whatever operating system you are using. This will help you understand how environment variables are stored, how they are accessed, and how your system manages tools on the Command Line Interface (CLI). Unfortunately a lot of people assume that those using GitHub, GitLab, or Codeberg understand how desktop environments and file systems work. If you do not understand your own desktop environment or desktop filesystem, I would recommend starting with one of these guides depending on your operating system.

* Linux: https://ubuntu.com/tutorials/command-line-for-beginners#1-overview
* MacOS: https://developer.apple.com/documentation/foundation/file-system
* Windows: https://learn.microsoft.com/en-us/windows/win32/fileio/file-systems

With that out of the way, go on ahead and run the following command in a directory where you want to store your repo pull. To directly run the CLI in a specific folder in Windows you can just type `cmd` into the address bar of file explorer while in the directory you want to use. Otherwise you will need to do the `cd ../somefilepath/theDirectoryYouWantToCloneTheFilesInto` command. I highly recommend `YYYY-MM-DD/files` for a reason I will mention here in a minute.

```bash
# clone the repository
cd ../somefilepath/theDirectoryYouWantToCloneTheFilesInto
git clone https://github.com/Asveora/rich-deployment
```

You can opt to label the directory as YYYY-MM-DD so you remember when you pulled the main branch and make a new YYYY-MM-DD directory for every pull. But this is a bit obtuse to some people and they will most likely just use the `git pull` command to update the build with committed changes in one directory. But I like having backups of the repo that I can reference while working on the project.

Once you have pulled the repo go on ahead and create a server.js file in the directory above the one that you cloned the project files into. Said directory should be your `YYYY-MM-DD` one from the `YYYY-MM-DD/files` I mentioned earlier. This will allow you to start up a node.js server on localhost for development. Create a new server.js file with your IDE. Then copy and paste the below code into it before saving it:

```
const express = require('express');
const path = require('path');

const app = express();

// This line is the key:
app.use(express.static(path.join(__dirname, 'files')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

Now open your terminal in the `YYYY-MM-DD` directory via `cd`ing to it or doing the file explorer `cmd` trick I mentioned above for Windows users. Then simply run `node server.js` and you should be good. If you get an error or have any missing dependencies then make sure you have installed express with `npm install express` or do a quick internet search for the error you get. If that does not work, then reach out in the Asveora Network Plaza community at: https://stt.gg/5wB2Zzb0
