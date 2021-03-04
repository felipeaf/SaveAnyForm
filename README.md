# SaveAnyForm

A simple tool to persist any regular html form. It can save anything, you don't need to do anything other than change action attribute to SaveAnyForm server.

## When use

SaveAnyForm its intended to attend some small and specific use cases where you can trust who can access SaveAnyForm server. You should be careful if your server is available on Internet because anyone would can insert anything in your database and even perform an DoS attack. I do not recommend to use for persist some widely available form for now.

## Configure

You must have a config.json. It's recommended to copy from "config (SAMPLE).json"file. It should look like this (but comments are not allowed in json files):

```javascript
{
    "persistence": {
        //only type available for now, but you should set this
        "type": "mongodb",
        "config": {
            //if required you can pass username and password
            //"uri": "mongodb://username:password@hostname:27017",
            //this should work for default mongo install:
            "uri": "mongodb://localhost:27017",
            
            //Mongo database. You can change this for each formId
            //using %%FORMID%% substring.
            "database": "saveanyform",
            
            //Mongo database. You can change this for each formId
            //using %%FORMID%% substring.
            "collection": "saf-%%FORMID%%"
        }
    },
    "server": {
        //optional if you want to use https only (what i do recoment)
        "httpPort": 8080,
        
        //optional if you want to use http (UNSECURE) only, but i do recommend
        //use https only
        "httpsPort": 8443,
        
        //optional if you want to use http only
        "cert": {
            "keyFile": "path-to-sslcert-private.key",
            "certFile": "path-to-sslcert.crt"
        },
        
        //successMsg used when your qryString don't has an redirect page
        "successMsg": "Form saved! Thank you!",
            
        //errorMsg showed when something goes wrong
        "errorMsg": "Something went wrong! Sorry!"
    }
}
```



## Install/Setting up server

Assuming that you have a Mongodb server running, and an recent node/npm version, you just need to run commands:

```bash
#install
npm install
cp sample/config.json config.json
vim config.json #configure as commented above.

#running
npm start
```

Just it, its working!

## Usage
Just create any form in html, it could be host in your site, in your filesystem, or, if you wish, host in SaveAnyForm server (putting your file in *saveanyform-dir*/**public_html** folder, create if not exists), and just set two attributes, **method** as "POST" and **action** as something like *SaveAnyFormURL*/*formId*?redirect=*successURLPage* , where:

- *SaveAnyFormURL*. URL for SaveAnyForm, if your file is hosted in SaveAnyForm, you don't need this (and also the '/' character).
- *formId*: A name to identify all form-data sent from same form in your database.  You should choose a unique name. Is optional only if your form is hosted in SaveAnyForm server (then, your formId will be your filename). It appears inside the document saved (in metadata subobject) and also can appear in your collection name and database name if you wish (using %%FORMID%% substring in config.json file)
- *successURLPage*, a url for a page to be redirect after the form is sent. If the success page is  hosted in SaveAnyForm, you  The entire queryString (?redirect=*successURLPage*) part is optional if you have an successMsg in your config file.

## Hello world

Just setup your server to connect your mongodb, create a public_html folder inside your main SaveAnyForm directory,  and create any form like this:

```html
<!DOCTYPE html>
<html>

<body>
   <form method="POST">
      Full Name:<br>
      <input type="text" name="fullname" required>
      <br>
      <p>Check your prefered language.</p>
      <label for="aradiogrp1">Male</label>
      <input id="aradiogrp1" type="radio" name="preferedLanguage" value="MALE"><br>

      <label for="aradiogrp2">Female</label>
      <input id="aradiogrp2" type="radio" name="preferedLanguage" value="FEMALE"><br>

      <label for="aradiogrp3">Other</label>
      <input id="aradiogrp3" type="radio" name="preferedLanguage" value="OTHER"><br>
      
      <p>Check the languages you are most proficient in.</p>
      <input type="checkbox" id="acheckboxgrp1" name="proficientLanguages" value="JS">
      <label for="acheckboxgrp1"> Javascript</label><br>

      <input type="checkbox" id="acheckboxgrp2" name="proficientLanguages" value="JAVA">
      <label for="acheckboxgrp2"> Java</label><br>

      <input type="checkbox" id="acheckboxgrp3" name="proficientLanguages" value="PYTHON">
      <label for="acheckboxgrp3"> Python</label><br>
      <br>
      <input type="submit" value="Submit">
      <input type="reset" value="Reset">
   </form>
</body>

</html>
```

Just run from your browser (*saveAnyFormURL*/aform.html, supposing aform.html is the file that you've created) and submit. It should store in your Mongo database something like this:

```json
{
    "_id" : ObjectId("6040e39a6c0130ca635a94d6"),
    "metadata" : {
        "formId" : "aform.html",
        "createdAt" : ISODate("2021-03-04T13:41:46.280Z")
    },
    "data" : {
        "fullname" : "name",
        "preferedLanguage" : "MALE",
        "proficientLanguages" : [ 
            "JS", 
            "PYTHON"
        ]
    }
}
```



## License

Copyright © 2021 Felipe Alexandre Ferreira

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
