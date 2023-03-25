# <img src="images/tips-and-updates.svg" /> Ngx-Workshop

Get ready for an exciting journey as we embark on a fun and interactive adventure with Ngx-Workshop! Our mission is to make learning how to create full stack web applications not just educational but also an absolute blast. 🎓 🎢

## What can you expect? 🧐
By using the application workshops, you'll dive headfirst into crafting the ultimate full stack workshop creation application. Ngx-Workshop has three core features to keep you engaged and help you level up your skills:

1. Content Management System (CMS) 📚 - As an admin, you'll have the power to create and manage workshops with ease, turning your ideas into reality.

2. Tests Generator 🧪 - Put your knowledge to the test! Generate quizzes on workshop topics to ensure you're mastering the content.

3. User Journey Tracking System 🗺️ - Keep tabs on your progress and celebrate your achievements as you navigate through the world of full stack web development.

So, buckle up and get ready to have a fantastic time exploring and learning with Ngx-Workshop! Happy coding! 🎉 💻

<br>

# Get Set Up in No Time! 🛠️ 💨

Ready to run Ngx-Workshop on your local machine? Let's get everything installed in a snap! Just follow these simple steps:

## Quick 'n' Easy Installation 🏃‍♂️

Here's a list of dependencies you'll need to get up and running:

- NodeJs
- Angular CLI
- NestJs CLI
- Docker
- Nginx
- MongoDB
- InfluxDB

We're all about keeping it simple (remember [KISS](https://en.wikipedia.org/wiki/KISS_principle) 😉), so we'll focus on just getting everything installed for now. In future workshops, we'll dive deeper into each of these dependencies. Of course, feel free to install them your own way if you prefer!

> **Windows Users, Heads Up!** 🚨
> 
> We highly recommend using WSL (Windows Subsystem for Linux) to get the best experience.
> 
> You can find the installation guide [here](https://learn.microsoft.com/en-us/windows/wsl/install).

That's it! You're all set to start your Ngx-Workshop adventure. Happy installing! 🎉 🔧

 
<br>

## NodeJs with NVM: Smooth Sailing Ahead!
[<img src="images/nodejs-logo.svg" height="60" />](https://github.com/nodejs/node)
[<img src="images/nvm-logo.svg" height="40" />](https://github.com/nvm-sh/logos)

[Official Documentation](https://github.com/nvm-sh/nvm)

NVM (Node Version Manager) is our go-to choice for effortlessly installing different versions of NodeJs. Let's get you started with NVM and NodeJs in a jiffy!

Install `nvm`:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
Restart terminal or open a new terminal.

Install `18.10.0` version of NodeJs:

```sh
nvm install 18.10.0
```

<br>

## Angular CLI: Turbocharge Your Development Experience!

[<img src="images/angular-logo-2.svg" height="60" />](https://github.com/nodejs/node) [<img src="images/cli-logo.svg" width="50" />](https://github.com/nvm-sh/logos)

[Official Documentation](https://angular.io/cli)

Angular CLI is a game-changing tool that helps us quickly generate boilerplate application code, making for a fantastic development experience.

### Installing Angular CLI

It's super easy to install the Angular CLI using the `npm` package manager. Just run the following command:

```sh
npm install -g @angular/cli
```

And there you have it! Angular CLI is now installed and ready to help you supercharge your Ngx-Workshop experience.

<br>

## NestJs CLI: Seamless Frontend to Backend Transition!

[<img src="images/nestjs-logo-2.svg" height="75"/>](http://nestjs.com/)

[Official Documentation](https://docs.nestjs.com/cli/overview)

NestJs follows the same patterns as Angular, which means you'll now be enjoying isomorphic programming (buzzword joke 😉). This makes transitioning between frontend and backend development a breeze!

### Installing NestJs CLI

Getting the NestJs CLI installed is as easy as pie with the `npm` package manager. Just run this command:

```sh
npm install -g @nestjs/cli
```

And voilà! The NestJs CLI is installed and ready to help you smoothly switch between frontend and backend development in your Ngx-Workshop journey. Keep up the great work!

<br>

## Docker: Say Goodbye to "It Works on My Machine"!

[<img src="images/docker-logo.png" height="48" />](https://www.docker.com/)

[Official Documentation](https://docs.docker.com/)

Docker took the "it works on my machine" meme and turned it into a powerful solution. Docker sets up self-contained images of the next three dependencies we need, ensuring a consistent environment across the board.

### Installing Docker Desktop

Get started by installing the Docker Desktop [application](https://www.docker.com/products/docker-desktop/):

[<img src="images/docker-desktop.png" width="700" />](https://www.docker.com/products/docker-desktop/)

With Docker in your toolkit, you can confidently develop and deploy, knowing that your environment will stay consistent throughout your Ngx-Workshop journey. Enjoy the power of containerization! 🎉 📦

<br>

## Nginx: Unleash the Power of a Blazing Fast Reverse Proxy!

[<img src="images/nginx-logo-2.svg" height="75" />](https://www.nginx.com/)

[Official Documentation](https://docs.nginx.com/)

Nginx brought a groundbreaking change to the world of reverse proxies with its ultra-fast performance. We'll tap into that incredible speed for local development, and later explore the wonders of load balancing. 🚀 🌐


## Installing Nginx Docker Container

To get started with Nginx, install the Nginx Docker Container using the following command:

```sh
docker run --name workshop-nginx -p 80:80 -d nginx
```

### Configuring Proxy Rules
After installing, we need to add some proxy rules to `/etc/nginx/conf.d/default.conf`.

Simply copy the content of this [file](install-helpers/default.conf) into the Nginx default.conf file.

<img src="images/nginx-conf.png" width="700" />

Finally, stop and restart the Docker Nginx container to apply your changes.

With Nginx now in your arsenal, you're ready to conquer the world of reverse proxying on your Ngx-Workshop adventure. Enjoy the speed! 🎉 ⚡

<br>

## MongoDB: Flexible, Scalable, and High-Performance Data Management!

[<img src="images/mongodb-logo-2.svg" height="45" >](https://www.mongodb.com)

[Official Documentation](https://www.mongodb.com/docs/)

MongoDB is a powerful, flexible, and scalable NoSQL database system that allows you to handle your data with high performance and ease.

### Installing MongoDB Docker Container

Get MongoDB up and running by installing the MongoDB Docker Container with the following command:

```sh
docker run --name workshop-mongo -d -p 27017:27017 mongo:latest
```

## MongoDB Compass: Visualize and Manage Your Data Effortlessly!
[Official Documentation](https://www.mongodb.com/docs/)

### Installing MongoDB Compass
Install the MongoDB Compass desktop application:

<img src="images/mongodb-compass.png" width="700" />

### Configuring MongoDB Compass
Connect to the localhost instance, create a new database named workshop-viewer, and then create four new collections:

- categories
- sections
- workshops
- users

### Importing Helper Files

Import the following helper files found here:

- categories.json
- sections.json
- workshops.json

<img src="images/mongodb-compass-sections.png" width="700" />

We'll walk you through creating a user in the workshop-api project's README.

With MongoDB and MongoDB Compass in your toolkit, you're all set to manage and visualize data with ease in your Ngx-Workshop journey. Enjoy the power and flexibility of this dynamic duo! 🎉🔥

<br>

## InfluxDB: High-Performance Time Series Data at Your Fingertips!

[<img src="images/influxdb-logo-2.svg" height="45" />](https://www.influxdata.com/)

[Official Documentation](https://docs.influxdata.com/)

### Installing InfluxDB Docker Container

Get InfluxDB up and running by installing the InfluxDB Docker Container with the following command:

```sh
docker run --name influxdb -p 8086:8086 influxdb:2.0.9
```

<img src="images/influxdb-docker.png" width="700" />

InfluxDB Admin: Manage Your Data Like a Boss! 💼👩‍💼
Navigate to the InfluxDB admin panel at `localhost:8086` and set up your admin account. While setting up the organization and bucket name, use these values:

- Organization Name: `Ngx-Workshop`
- Bucket Name: `Ngx-Workshop-Bucket`

<img src="images/influx-admin-bucket.png" width="700" />

Next, navigate to the Load Data section and Tokens tab. Generate a new token named:

- `Ngx-Workshop-API`

<img src="images/influx-admin-token.png" width="700" />

🎉 🚀 Congratulations! You've successfully installed all the required dependencies for your Ngx-Workshop project. You're now equipped with a powerful set of tools to create a full stack web application. You've got NodeJs, Angular CLI, NestJs CLI, Docker, Nginx, MongoDB, MongoDB Compass, and InfluxDB all ready to rock! Let the fun and engaging learning journey begin! 🌟 🌈

<br>

# Serving Locally

<!-- Welcome to Ngx-Workshop, where learning to create a full stack web application is as fun and easy as a walk in the park! With our user-friendly platform, you can create workshops on how to build the full stack workshop creation application  - talk about inception!

Our application features a content management system that lets admins create workshops, a tests generator to make learning exciting and engaging, and a user journey tracking system to help you keep track of your progress. We believe that learning should be enjoyable, and that's exactly what we aim to provide with Ngx-Workshop.

So, whether you're a seasoned developer looking to level up your skills or a newbie just dipping your toes in the programming waters, Ngx-Workshop has got you covered. Let's get ready to build some awesome web apps together! -->
