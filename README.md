# SignalstoreTutorial

* Version: **1.0.1**

## Packages to install

### [signals](https://ngrx.io/guide/signals) & [ngrx/operators](https://ngrx.io/guide/operators/operators)

````bash
npm install @ngrx/signals --save &&
npm install @ngrx/operators --save
````

## start backend

````bash
npm start-server
````

## start frontend

````bash
ng serve
````

## crate backend container

````bash
docker build -f backend/Dockerfile -t my-backend . &&
docker run -d -p 3000:3000 --name backend-container my-backend
````

## crate frontend container

````bash
VERSION=$(node -p "require('./package.json').version") && 
docker build --build-arg VERSION=$VERSION -t signalstore-tutorial:$VERSION . &&
docker run -d -p 8080:80 --name my-angular-container signalstore-tutorial:$VERSION
````

