# Comparing Russian Interference Project

A simple analysis tool on Posts in the db.json that are flagged as Russian Interference. 
Search, examine and compare to your hearts content.

## Install 
```
npm run total-install
```

## Run
```
npm run start
```

## What you can do 

- You can search the database for a specific id
- You can filter based on Text Content, URL, PDF, Image Number, Created At and Ended on as long as it contains the string in the input field.
- You can search for "null" on the ended on property.
- filter by Impressions and Clicks only go through if the number is an exact match.
- Can be ordered by Impressions or Clicks in Ascending or Descending fashion. 
- You can add and remove posts to and from your watch list. 
- You can load more post. (set to 50 per load)
- You can change the amount of posts per load to either 20, 50 or 100.

## Packages Used 

* json-server: https://github.com/typicode/json-server
    - this helps set up all the api routes for me, makes it easier so I can just focus on the overall design.
    - provides queries that have start / end / order / sort and etc. 
    - does a lot of the filtering on the backend which lessons the load for my frontend.

* Example json-server Queries
    - http://localhost:3000/posts?_sort=clicks&_order=desc
    - http://localhost:3000/posts?_start=0&_end=30
    - http://localhost:3000/posts?_start=0&_end=30&textq=black
    - http://localhost:3000/posts?_sort=clicks&_order=desc&_start=100&_end=110
        - custom query: 
            - http://localhost:3000/posts?_sort=clicks&_order=desc&_start=100&_end=110&ended_is_null

* React Framework https://reactjs.org/
    - Declarative and component based.
    - Helped me manage the state for this singe plage application.
