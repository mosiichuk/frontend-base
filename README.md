# SJE
## Project setup
1. Install [Node JS](https://nodejs.org/uk/)
2. Clone repository: 
```
git clone git@github.com:mosiichuk/frontend-base.git
```
3. In the root of the folder run command:
```
npm run start
```

## Branching strategy
1. Before starting to work on new tast, pull new changes from master branch.
```
git checkout master
git pull
```
2. Create new branch from master. Branch name should be number of your task, e.g. SJE-01.
```
git checkout -b SJE-01
```
3. After work, add your changes to git and commit them. Format of commit message should be: [name of your branch] Commit message (e.g. [SJE-01] Initial commit).
```
git add *
git commit -m "[SJE-01] Initial commit"
```
4. Finally, push your changes to remote repository.
```
git push origin SJE-01
```
