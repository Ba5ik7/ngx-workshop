# <img src="images/tips-and-updates.svg" /> Ngx-Workshop 
<!-- <a href="https://nx.dev"><img src="images/nx-logo.png" height="37"></a>
<a href="https://angular.io/"><img src="images/angular-logo.svg" height="45" /></a>
<a href="http://nestjs.com/" target="blank"><img src="images/nestjs-logo.svg" height="45"/></a>
<a href="https://www.nginx.com/" target="blank"><img src="images/nginx-logo.svg" height="45" /></a>
<a href="https://www.mongodb.com"><img src="images/mongodb-logo.png" height="45" /></a>
<a href="https://www.influxdata.com/"><img src="images/influxdb-logo.svg" height="45" /></a> -->


## Installing Locally
To run the application locally, we need to install a few dependences:
<ul>
  <li>NodeJs</li>
  <li>Angular CLI</li>
  <li>NestJs CLI</li>
  <li>Docker</li>
  <li>Nginx</li>
  <li>MonogoDB</li>
  <li>InfluxDB</li>
</ul>

I'll walk through how I install them. Big fan of [KISS](https://en.wikipedia.org/wiki/KISS_principle). However, please feel free to install them how you would like.

### NodeJs
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

### Angular CLI

[<img src="images/angular-logo-2.svg" height="50" />](https://github.com/nodejs/node)
[<img src="images/cli-logo.svg" width="50" />](https://github.com/nvm-sh/logos)

[Documents](https://angular.io/cli)

Install the Angular CLI using the `npm` package manager:
```
npm install -g @angular/cli
```
### NestJs CLI
[<img src="images/nestjs-logo.svg" height="45"/>](http://nestjs.com/)

[Documents](https://docs.nestjs.com/cli/overview)

Install the NestJs CLI using the `npm` package manager:
```
npm install -g @nestjs/cli
```

### Docker

[<img src="images/docker-logo.png" height="48" />](https://www.docker.com/)

[Documents](https://docs.docker.com/)

Install Docker desktop [application](https://www.docker.com/products/docker-desktop/):

[<img src="images/docker-desktop.png" width="700" />](https://www.docker.com/products/docker-desktop/)


### Nginx

[<img src="images/nginx-logo.svg" height="48" />](https://www.nginx.com/)

[Documents](https://docs.nginx.com/)

Install the Nginx Docker Container:
```
docker run --name workshop-nginx -p 80:80 -d nginx
```

After installing we need to add some proxy rules to `/etc/nginx/conf.d/default.conf`.

Copy the content of this [file](install-helper/default.conf) to the nginx default.conf flie.

<img src="images/nginx-conf.png" width="700" />

Stop and restart the Nginx container.


### MonogoDB

[<img src="images/mongodb-logo-2.svg" height="45" >](https://www.mongodb.com)

[Documents](https://www.mongodb.com/docs/)

### InfluxDB


## Development server

Run `nx serve workshop-ui` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
