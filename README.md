# Spendster Backend
This is an API example to provide a non-trivial example of how to build an API and how to use various tools to maintin it. (Also to pad my github account a bit ;) )

## Structure
The directory structure is fairly straight forward

```
+ bin               // Contains the actual server script
|
+ config            // Contains config for the project
|
+ + db.js           // Contains the db config
|
+ + app.js          // Contains the app config
|
+ db                // Contains db related stuff
|
+ + migrations
|
+ + models
|
+ + index.js        // This file contains the basic db setup to be used in the project
|
+ handlers          // Contains the handlers for various APIs.
|
+ routes            
|
+ tests
|
+ app.js            // This sets up the server and stitches it together to be used by the ./bin/www file
|
+ auth.js           // Contains the auth strategies

```