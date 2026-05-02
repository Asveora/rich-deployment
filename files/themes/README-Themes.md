
# Asveora Themes Guide

## PROPER THEME FILE NAMING

All theme files should be in the .css format and any assets such as images, audio, and videos should be placed inside of a folder marked "assets-theme-name" where "theme-name" is the name of the theme. Theme files and folders should be named with their applied HTML name first (the name that the HTML files of the Asveora framework are already setup to read) followed by the name of the theme. For example:

assets-asveora-default
main-style-asveora-default.css
chat-style-asveora-default.css

where "assets", "main-style", and "chat-style" are the parts you keep when you move the theme to the styles directory while "asveora-default" is the name of the theme and you remove those when you move the theme to the styles directory. Why? Because all of the HTML files of the Asveora framework will expect:

assets
main-style.css
chat-style.css

instead of the full filenames of the theme as seen above. If you have any questions about this process, please reach out for assistance via the "GET-HELP.txt" file.


## DEPLOYING & ARCHIVING THEMES


Store all theme folders in this directory. To set a theme for your profile simply copy the "main-style" CSS file and any related CSS files to the styles directory after renaming your previous CSS files to "PreviousCSSFileName-backup" that way you can revert to your old CSS style sheet in case the new one you copy in does not behave correctly. For example:

OldStyleFileName.css

would then read

OldStyleFileName-backup.css

and you would put in the new file such as:

NewStyleFileName.css

Please keep in mind that "OldStyleFileName" and "NewStyleFileName" are placeholders representing the current CSS file you have stored in the styles directory and the one you are replacing it with.

## CREATING THEMES

Creating themes is easy! Just make a copy of the "0000-Sample-Theme" directory, rename it to whatever theme number is the latest in your collection (it most likely will be 0002-YourThemeName if you just downloaded a fresh build of the framework) and give it a name you like. Then rename the CSS files inside to match the name you gave your theme and begin editing the CSS documents! Get creative and feel free to add some custom assets with an assets folder! :)

**This guide was written by AmzroSevca (amzrosevca.aesnetivan.xyz) on 2026-05-02.**<br>
**It is free for redistribution and teaching. This guide shall not be monetized or restricted.**<br>
**🄯 2026 Asveora, LLC**