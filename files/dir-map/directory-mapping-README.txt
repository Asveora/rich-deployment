========================================
Directory Mapping
========================================

This is a directory model template that is used for keeping files and associated objects organized within Asveora's project space. To get a look at the general layout open either the data-map.png file, data-map.txt file, or the data-map.html file. This model was created by AmzroSevca and the "Assets Directory Structure" was inherited from one of their other projects, Prisxane. You are free to use this model to keep your files organized and are encouraged to do so as it gives everything a proper home for life!

========================================
Initial Configuration
========================================

If you want to use this template, make a copy of the "Username" folder and then store it somewhere in your desktop or filesystem environment where you want to store everything related to Asveora. I recommend making a dedicated folder called "Asveora" or "Asveora-Social" or something like that. Then put your copy of the Username folder in there. Now rename the folder with your Asveora username or the name of the wheelcore, landhub, system, federation, etc. that you are going to be using the folder for.

Now you can begin storing all of your data there! You can move all of your pages, images, and other assets into their new homes from the git repo that you pulled. To access your site locally for development or browsing, make sure to move or copy all of the js and json local server files of this repo to the root of your "Username" folder so that you can run "node server.js" from the command line and have express.js already configured. Be sure to also move the index.html file into the root of the "files" folder that is under the "Username" folder so that your local server has a default page to load. The index.html page is usually just a clone of whatever page you want have as the default landing. For most people it will be the profile-home.html page. Below is what the structure should look like:

Username
====server.js
====package-lock.json
====package.json
====node_modules
====files
========Data
========Save
========index.html

========================================
Why is it like this?
========================================

This process might seem confusing at first, but the directory structure of the git repo is different from the standard Asveora one since it is arranged for development first and foremost. If you have any questions, please check the GET-HELP.txt file in the root directory of this repo you just pulled! :)

========================================

This guide was written by AmzroSevca (amzrosevca.aesnetivan.xyz) on 2026-05-02.
It is free for redistribution and teaching. This guide shall not be monetized or restricted.
🄯 2026 Asveora, LLC