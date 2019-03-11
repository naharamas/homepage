HomepageDX
=================

My take on E66666666's homepage [(https://github.com/E66666666/homepage)](https://github.com/E66666666/homepage).

Updated APIs after YQL stopped working. 
Now using Dark Sky for weather. Note that since Dark Sky needs an API key it won't work on the demo.
For RSS feeds the demo is using an enhanced version of the latest release of FeedEk(3.1.1 at  this time), restoring some options that disappeared. Otherwise I'm using a local proxy to get the feeds through CORS policy and then I process them using a modified FeedEk. Both are used in the exact same way, you just need to change the linked script in the html.

Most configuration is made in vars.js. 

Links can be edited live now. There's a hidden button in the top-right corner that put the page in edit mode, it uses drag&drop to move and get rid of links. To close edit mode just press the button again. 

Background is still random but not dependant on time. Instead it's chosen from a selected theme. 3 hidden buttons are added in the top left corner to manage that. First one changes the background in the current theme, second one is a dropdown list to select the theme, and thrid one is the toggle blur button.
Also, no more browser tab color changes.

If you're using third-party FeedEk(like the demo), the page can be hosted in any folder of your computer, no need for a webserver. 

The whole page uses Local Storage to save your links, notes, current theme, etc... So if you clean it you will lose that.

I've been using and tweaking this page for more than a year. This repo is a somewhat clean version of it.
It's barely working and certainly not efficient, but at least it works. 

Live at [https://naharamas.github.io/homepageDX/](https://naharamas.github.io/homepageDX/)
