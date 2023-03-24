# <img src="images/tips-and-updates.svg" > Ngx-Workshop 
<!-- <a href="https://nx.dev" target="_blank"><img src="images/nx-logo.png" height="37"></a>
<a href="https://angular.io/" target="_blank"><img src="images/angular-logo.svg" height="45" alt="Angular" /></a>
<a href="http://nestjs.com/" target="blank"><img src="images/nestjs-logo.svg" height="45" alt="Nest Js" /></a>
<a href="https://www.nginx.com/" target="blank"><img src="images/nginx-logo.svg" height="45" alt="Nginx" /></a>
<a href="https://www.mongodb.com" target="_blank"><img src="images/mongodb-logo.png" height="45" alt="MongoDB" ></a>
<a href="https://www.influxdata.com/" target="_blank"><img src="images/influxdb-logo.svg" height="45" alt="MongoDB" ></a> -->


## Installing Locally
To run the application locally, we need to install a few dependences:
<ul>
  <li>NodeJs</li>
  <li>Angular CLI</li>
  <li>NestJs CLI</li>
  <li>Nginx</li>
  <li>MonogoDB</li>
  <li>InfluxDB</li>
</ul>

I'll walk through how I install them. Big fan of <a href="https://en.wikipedia.org/wiki/KISS_principle" target="_blank">KISS</a>. However, please feel free to install them how you would like.

### NodeJs
<a href="https://github.com/nodejs/node"><img alt="nodejs" src="images/nodejs-logo.svg" height="60" /></a>
<a href="https://github.com/nvm-sh/logos"><img alt="nvm" src="images/nvm-logo.svg" height="40" /></a>

Normally, I use a `nvm` for a easy and quick install of NodeJs.

The NVM repo is found <a href="https://github.com/nvm-sh/nvm" target="_blank">here</a>

Simply bash this command:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
Restart or open a new terminal.

Install `18.10.0` version of node:

```sh
nvm install 18.10.0
```

### Angular CLI

<a href="https://github.com/nodejs/node"><img alt="nodejs" src="images/angular-logo-2.svg" height="50" /></a>
<a href="https://github.com/nvm-sh/logos"><img alt="nvm" src="images/cli-logo.svg" width="50" /></a>

<a href="https://angular.io/cli" target="_blank">Documents</a>

Install the Angular CLI using the `npm` package manager:
```
npm install -g @angular/cli
```
### NestJs CLI
<a href="http://nestjs.com/" target="blank"><img src="images/nestjs-logo.svg" height="45" alt="Nest Js" /></a>

<a href="https://docs.nestjs.com/cli/overview" target="_blank">Documents</a>

Install the NestJs CLI using the `npm` package manager:
```
npm install -g @nestjs/cli
```

### Docker

<a href="https://www.docker.com/" target="blank"><img src="images/docker-logo.png" alt="Nginx" height="48"/></a>

<a href="https://docs.docker.com/" target="_blank">Documents</a>

Install Docker desktop <a href="https://www.docker.com/products/docker-desktop/" target="_blank">application</a>:

<a href="https://www.docker.com/products/docker-desktop/"><img alt="nvm" src="images/docker-desktop.png" width="400" /></a>


### Nginx

<a href="https://www.nginx.com/" target="blank"><img src="images/nginx-logo.svg" alt="Nginx" height="48"/></a>

<a href="https://docs.nginx.com/" target="_blank">Documents</a>

### MonogoDB

<a href="https://www.mongodb.com" target="_blank"><img src="images/mongodb-logo-2.svg" height="45" alt="MongoDB" ></a>

<a href="https://www.mongodb.com/docs/" target="_blank">Documents</a>

### InfluxDB


## Development server

Run `nx serve workshop-ui` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
