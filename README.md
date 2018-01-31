# BeeHive
A roommate bill management application
--------------------------------------

Main purpose of project was to allow clients to be database users.
Utilizing native mongoDb Node driver to,

    -add database users
    -Manage database user roles, using collection level access control
    
This was achieved by constructing an immutable database object with methods that wrap mongo's functions.
[View Database Code](./lib/database.js)


[Preview App](https://hivemanager.herokuapp.com/)
    
