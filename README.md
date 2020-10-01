# AngularArgonDashboard

## requeriments
https://nodejs.org/es/download/
### to run

```
npm install
```
```
ng serve
```
```
npm run ng serve
```

Set-ExecutionPolicy Unrestricted
delete all ng files in %USERPROFILE%\AppData\Roaming\npm\
npm install @angular/cli -g

$icon-size-xl
5rem


web: node --max_old_space_size=2048 ./node_modules/@angular/cli/bin/ng build --prod && node ./node_modules/@angular/cli/bin/ng serve":heroku


    "build": "npm install && ng serve", 

    "postinstall": "npm run build",

https://blog.liplex.de/increase-node-memory-limit-for-build/

    //"build": "ng build --prod --sm=false --aot --output-path=dist/client && npm run server:build",
npm run ng build --prod --aot

web: npm install && npm run ng serve:heroku

# heroku last hit
https://medium.com/better-programming/how-to-deploy-your-angular-9-app-to-heroku-in-minutes-51d171c2f0d

# Technical Analysys for Shares

    // "postinstall": "ng build --prod",
    "heroku-postbuild": "ng build --prod",

# solve npm ERR! argon-dashboard-angular@1.1.0 postinstall: `ng build --prod`
# https://stackoverflow.com/questions/42308879/how-to-solve-npm-error-npm-err-code-elifecycle
npm cache clean --force

npm install

npm start

.\src\app\layouts\admin-layout\admin-layout.routing.ts
.\src\app\layouts\admin-layout\admin-layout.module.ts
