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

npm run ng build --prod --aot

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
