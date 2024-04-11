# Setting up docker compose:
Install Docker Desktop: Docker Desktop is available for both Windows and macOS. You can download the installer from the official Docker website:

Docker Desktop for Windows [here](https://docs.docker.com/desktop/install/windows-install/)

Docker Desktop for Mac [here](https://docs.docker.com/desktop/install/mac-install/)

Docker compose should now be installed. You can check with the following:

`docker-compose --version`

Now, navigate to the teathrebooking directory
`cd /path/to/theatrebooking`

and run the following commands:

`docker-compose build`

`docker-compose up` (or `docker-compose up -d` to run in detached mode) 

`docker-compose down` to stop the containers

Now, you can access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`


# Projects #8 & 9: Theatre Booking System  

These projects create a website for a theatre’s online booking system.  

\#8: Theatre Booking System (1)  
You are responsible for implementing the following two user stories that define how an admin uses the 
system: 

i. An admin signs into their online account and creates and/or edits list of entertainment shows 
currently running at the theatre (including show name, genre, brief description, dates, price). There 
is also a number of available tickets remaining associated with each date of the show. By default, 
during this process the edited entertainment shows are in ‘draft’ and not publicly viewable on the 
website. 
ii. An admin signs into their account and can sort and view the list of entertainment shows, and 
choose which shows to have in ‘draft’ status and which to have ‘published’ to the website. They can 
edit the list, as detailed in user story (i) above. When an admin is working with a show’s details they 
are not editable by other admins. 

Note that your group will have to liaise with the group that implements Theatre Booking System (2) with 
respect to the data model in order to ensure compatibility and overall functionality. 

# \#9: Theatre Booking System (2)  

You are responsible for implementing the following two user stories that define how an individual member 
of the public uses the system: 

i. Individual goes to the website and views list of entertainment shows available to book at the 
theatre, and can filter to view different genres of shows, different dates, availability of tickets and 
sort by price. For each show the following details are available: show name, genre, brief 
description, dates, price, number of available tickets. Note – for price there are multiple prices of 
tickets available. 
ii. Individuals can select a show to book their preferred price tickets for it. The chosen tickets are 
removed from the list of available tickets for that show on that date. The individual booking the 
ticket also enters their name, address and phone number when making their booking.  If they do 
not complete the booking the tickets should be released back into the pool of available tickets.  

Note that your group will have to liaise with the group that implements Theatre Booking System (1) with 
respect to the data model in order to ensure compatibility and overall functionality. 

# 13/3/2024

Google Drive Folder

https://drive.google.com/drive/folders/1OWg4eXETB4VzFkcyE2hHWGsQdy9GtNGw?usp=drive_link

Swagger-API Developmentfor Everyone

https://swagger.io/



Start like this, but can help each other:

1.UX Design-All of us

2.Karl+Mengqi, Back-end

3.Jyoti+Jasmine, Front-end

4.David, Architecture

5.Group 6, communicate with them, about the database.

# 14/3/2024 - 21/3/2024

UX Design






# Code & Report-Due: Wednesday, 17/4/2024, 12:00 AM





# Presentation-Due: Friday, 19/4/2024, 12:00 AM
