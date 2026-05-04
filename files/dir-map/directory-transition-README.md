# Updating File Paths for "Username" Directory Structure

For all media paths replace: 

`/media/`

with

`../../../`

which will allow HTML pages from a "Scripting-Box" directory to access paths at the root of the "Data" folder.

For linking to neighboring HTML pages, do:

`../../DirectoryNameOfNeighboringHTMLPage/Scripting-Box/NameOfNeighboringHTMLPage.html`

# Matching index.html to profile-home.html

Since your index.html file will not have the same relative file paths as your profile-home.html, you will have to set different ones for it. Why will it not have the same paths? Because as stated in the "file-paths-guide" file, it exists in a higher directory and therefore will not need relative links that go "up" in the directory tree, but rather will have all relative links that go "down" in the directory tree. 

# Setting a Jump Point to profile-home.html on localhost

Want to jump to your profile-home.html? Here is a quick route! Edit this link if you have set your localhost port so something other than `3000` in your server.js file!

`http://localhost:3000/Data/PageBin/profile-home/Scripting-Box/profile-home.html`

Want to jump to your other html pages? Here is a quick route! Edit this link if you have set your localhost port so something other than `3000` in your server.js file!

`http://localhost:3000/Data/PageBin/YourPageName/Scripting-Box/YourPageName.html`

# Pre-Written Relative File Paths

## Accessing CSS Files From HTML Files

`../../../Themes/0000000-Current-Theme/main-style.css`

## Accessing JavaScript Files From HTML Files

`../../javascript/NameOfYourScript.js`

## Accessing Audio Files for music-button.js

`../../profile-home/sound-select/YourProfileMusic.mp3`

# Accessing the Navbar and Footer for fetch-elements.js

`../../navbar/navbar.html`

`../../footer/footer.html`

**This guide was written by AmzroSevca (amzrosevca.aesnetivan.xyz) on 2026-05-02.**<br>
**It is free for redistribution and teaching. This guide shall not be monetized or restricted.**<br>
**🄯 2026 Asveora, LLC**