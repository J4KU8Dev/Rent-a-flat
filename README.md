# Starting project

To run project, type in first terminal:
```bash
npm start
```

To run Data from Api, in second terminal type: 
```bash
npx json-server --watch db.json -p 5000
```

To do:
{
    Create place (like component) for managing other account, only for head admin
    hierarchy account:
    headAdmin <- admin <- user
}
customize errors in create account component
delete input phone in account settings if user doesn't have it(its empty blank)
user can create account without choosing gender!!!