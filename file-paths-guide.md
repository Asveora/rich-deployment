# Foreword 

This guide teaches the basics of directory navigation and writing correct relative file paths. This MIGHT be a little bit advanced for someone who has never interacted with computers or computer filesystems before. If you are new to computing, then please read one of the following guides depending on your operating system. It is imperative that you understand how computers store and retrieve information from various locations.

* Linux: https://ubuntu.com/tutorials/command-line-for-beginners#1-overview
* MacOS: https://www.techrepublic.com/article/understand-the-mac-directory-structure-basic-commands/
* Windows: https://www.geeksforgeeks.org/ethical-hacking/windows-file-system-structure/
* Android: https://www.howtogeek.com/202644/how-to-manage-files-and-use-the-file-system-on-android/
* iOS: https://appleinsider.com/inside/ipados-26/tips/inside-files---how-to-manage-files-like-a-pro-on-iphone-ipad-and-apple-vision-pro

# Writing Local File Paths in Local Files

Are you trying to call in an asset or code file to your local HTML document or a document of another language and it's not loading? Well the most likely culprit is an improper file path. If the file path is relative (which it should be) then one must pay close attention to where the asset that you are trying to call into your document is located in relation to the location of your document. Relative file paths start with ".." or "/" instead of "http://" or "C://" because they are *relative* to wherever the file is stored in relation to the object that it is interacting with or calling upon. So first you must ask yourself these questions:

* Is the asset file I am calling into the document in the same directory as the document?
* If not, then is it in a directory **below**?
* And if it is not, then is it in a directory **above**?

What does above and below mean here? Well let's take a look at a sample directory map (also known as a directory tree) and break this down:

* ParentDirectory
	* SubDirectory
		* yourmediafile.mp4
	* yourfile.html
	
In this sample directory map, both "yourfile.html" and "SubDirectory" are stored at the *root* of the "ParentDirectory" where *root* is the first or top-most directory in a hierarchy. For instance, the *root* of "SubDirectory" would be:

* ParentDirectory/SubDirectory

while the *root* of the "ParentDirectory" would be:

* ParentDirectory

Both "SubDirectory" and "yourfile.html" are children objects of "ParentDirectory" since they are stored under it in the directory tree. Knowing this, we can now figure out the direction of where one file is located in relation to another. Since the "yourmediafile.mp4" file is what we want to access inside of "yourfile.html" then we can write the following relative path since we know it is "below" it in the directory structure:

	`SubDirectory/yourmediafile.mp4`

And how do we know it's below? Because it is lower in the directory tree's hierarchy that where it is located. It sits in a directory that has a root lower than the directory level that "yourfile.html" sits on. Now, what if we wanted to go into a directory "above" in order to access other directories or items stored at higher directory levels? Well let's take a look at another example:

* ParentDirectory
	* SubDirectory1
		* yourmediafile.mp4
	* SubDirectory2
		* yourfile.html
		
Now the directory tree is looking a *little* different. You might be wandering "How do I access the mp4 file if my HTML file is now in a different directory at the same level?" as you study the diagram. Well that's where exploring higher directories comes in. You will have to do this if not all of your files are stored at the root of a project folder. To reference a directory that is either at a higher level or starts at a higher level and branches off into different lower levels, you must write your path like so:

	`../SubDirectory1/yourmediafile.mp4`
	
So what do the dots mean and how does this work? Well here is a quick breakdown on how moving through directories works:

* Starting with “” (which means nothing at the start of the relative file path) assumes that your file is in the root directory and is looking into subdirectories below it.
* Starting with “/” (at the start of the relative file path) returns to the root directory and starts there.
* Starting with “../” (at the start of the relative file path) moves one directory backwards from your current directory and starts there.
* Starting with “../../” (at the start of the relative file path) moves two directories backwards from your current directory and starts there.
* Starting with “../../../” (at the start of the relative file path) moves three directories backwards from your current directory and...well you get the point I'm sure haha.
* To move forward through a directory tree, start with the first subdirectory and keep moving forward down the tree to a lower level.

And that's it! You now have the ability to correctly write relative file paths and locate files with ease!

