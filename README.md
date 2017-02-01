### IN ORDER TO RUN THE PROGRAM OPEN TERMINAL AND RUN THESE COMMANDS###

Global package installs

Install Bower and Gulp globally (if you haven't already in root directory)
1.) npm install bower -g
2.) npm install gulp -g


/////////// 

Local package installs

In this root directory  of the app's project folder 'lcastaneda' install bower. You will be prompted to answer a bunch of questions about your bower.json file. Just hit enter after each and accept all the defaults. You should now see a bower.json file in your root directory. 

3.) bower init


Since the repository already has all the dependencies in the bower_components folder you shouldn't have to install these dependencies:

bower install angular --save
bower install bootstrap --save
bower install jquery --save
bower install lodash --save
bower install angular-toastr --save
 
//////////////

Create a package.json file:

npm init


You will be prompted to answer a bunch of questions about your package.json file. Just hit enter after each and accept all the defaults. Next, install gulp locally:

npm install gulp --save

Check your gulp installs:
gulp -v

You should see two installs, one local and one CLI:
[11:11:16] CLI version 3.9.1
[11:11:16] Local version 3.9.1

Install the following:
npm install gulp-livereload --save
npm install wiredep --save
npm install gulp-util --save
npm install gulp-connect --save
npm install gulp-inject --save
npm install gulp-open --save

If all goes well, your package.json should have entries for all your locally installed packages 


The gulpfile.js content is specific for Mac. If you are running on Windows, change the following line on gulpfile.js from:
app: 'Google Chrome'

to:

app: 'chrome'