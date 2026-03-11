# Starting project

To run project, type in first terminal:
```bash
npm start
```

To run Data from Api, in second terminal type: 
```bash
npx json-server --watch db.json -p 5000
```
add error handling to login function and to delete user function
add local storage(for holding logged account, it provides from login out after refreshing site)
create auth guard