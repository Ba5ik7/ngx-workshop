# <img src="images/tips-and-updates.svg" /> Ngx-Workshop

Get ready for an exciting journey as we embark on a fun and interactive adventure with Ngx-Workshop! Our mission is to make learning how to create full stack web applications not just educational but also an absolute blast. 🎓🎢

## What can you expect? 🧐
By using the application workshops, you'll dive headfirst into crafting the ultimate full stack workshop creation application. Ngx-Workshop has three core features to keep you engaged and help you level up your skills:

1. Content Management System (CMS) 📚 - As an admin, you'll have the power to create and manage workshops with ease, turning your ideas into reality.

2. Tests Generator 🧪 - Put your knowledge to the test! Generate quizzes on workshop topics to ensure you're mastering the content.

3. User Journey Tracking System 🗺️ - Keep tabs on your progress and celebrate your achievements as you navigate through the world of full stack web development.

So, buckle up and get ready to have a fantastic time exploring and learning with Ngx-Workshop! Happy coding! 🎉

<hr>

## Installing Locally
To run the application locally, we need to install a few dependences:

- NodeJs
- Angular CLI
- NestJs CLI
- Docker
- Nginx
- MonogoDB
- InfluxDB

I'll walk through how I install them. Big fan of [KISS](https://en.wikipedia.org/wiki/KISS_principle). However, please feel free to install them how you would like.

<hr>

### NodeJs NVM
[<img src="images/nodejs-logo.svg" height="60" />](https://github.com/nodejs/node)
[<img src="images/nvm-logo.svg" height="40" />](https://github.com/nvm-sh/logos)

[Documents](https://github.com/nvm-sh/nvm)

Install `nvm`:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
Restart terminal or open a new terminal.

Install `18.10.0` version of NodeJs:

```sh
nvm install 18.10.0
```

<hr>

### Angular CLI
[<img src="images/angular-logo-2.svg" height="50" />](https://github.com/nodejs/node)
[<img src="images/cli-logo.svg" width="50" />](https://github.com/nvm-sh/logos)

[Documents](https://angular.io/cli)

Install the Angular CLI using the `npm` package manager:
```
npm install -g @angular/cli
```

<hr>

### NestJs CLI
[<img src="images/nestjs-logo.svg" height="45"/>](http://nestjs.com/)

[Documents](https://docs.nestjs.com/cli/overview)

Install the NestJs CLI using the `npm` package manager:
```
npm install -g @nestjs/cli
```

<hr>

### Docker
[<img src="images/docker-logo.png" height="48" />](https://www.docker.com/)

[Documents](https://docs.docker.com/)

Install Docker desktop [application](https://www.docker.com/products/docker-desktop/):

[<img src="images/docker-desktop.png" width="700" />](https://www.docker.com/products/docker-desktop/)

<hr>

### Nginx
[<img src="images/nginx-logo.svg" height="48" />](https://www.nginx.com/)

[Documents](https://docs.nginx.com/)

Install the Nginx Docker Container:
```
docker run --name workshop-nginx -p 80:80 -d nginx
```

After installing we need to add some proxy rules to `/etc/nginx/conf.d/default.conf`.

Copy the content of this [file](install-helpers/default.conf) to the nginx `default.conf` flie.

<img src="images/nginx-conf.png" width="700" />

Stop and restart the Nginx container.


<hr>

### MonogoDB
[<img src="images/mongodb-logo-2.svg" height="45" >](https://www.mongodb.com)

[Documents](https://www.mongodb.com/docs/)

Install the MongoDB Docker Container:
```
docker run --name workshop-mongo -d -p 27017:27017 mongo:latest
```

### MongoDB Compass
[Documents](https://www.mongodb.com/docs/)

Install MongoDB Compass desktop [application](https://www.mongodb.com/try/download/compass):

<img src="images/mongodb-compass.png" width="700" />

Connect to the localhost instance.

Create and new database name `workshop-viewer`

Create four new collections named:
- `categories`
- `sections`
- `workshops`
- `users`

Import the hepler files: 
- `categories.json`
- `sections.json`
- `workshops.json`

Files found [here](install-helpers/)

<img src="images/mongodb-compass-sections.png" width="700" />

We will walk through creating a user on the `workshop-api` project's readme.


<hr>

### InfluxDB
[<img src="images/influxdb-logo-2.svg" height="45" />](https://www.influxdata.com/)

[Documents](https://docs.influxdata.com/)

Install the InfluxDB Docker Container:
```
docker run --name influxdb -p 8086:8086 influxdb:2.0.9
```

<img src="images/influxdb-docker.png" width="700" />


## InfluxDB Admin

Navigate to the admin panel `localhost:8086`

Setup admin and while setting up the organization and bucket name use these values:

- Orgination Name: `Ngx-Workshop`
- Bucket Name: `Ngx-Workshop-Bucket`

<img src="images/influx-admin-bucket.png" width="700" />

Navigate to the Load Data section and Tokens tab generator new token named:

- `Ngx-Workshop-API`

<img src="images/influx-admin-token.png" width="700" />

## Serving Locally

<!-- Welcome to Ngx-Workshop, where learning to create a full stack web application is as fun and easy as a walk in the park! With our user-friendly platform, you can create workshops on how to build the full stack workshop creation application  - talk about inception!

Our application features a content management system that lets admins create workshops, a tests generator to make learning exciting and engaging, and a user journey tracking system to help you keep track of your progress. We believe that learning should be enjoyable, and that's exactly what we aim to provide with Ngx-Workshop.

So, whether you're a seasoned developer looking to level up your skills or a newbie just dipping your toes in the programming waters, Ngx-Workshop has got you covered. Let's get ready to build some awesome web apps together! -->
