# bchd-web

This is the repository for [bchd.cash](https://bchd.cash).

BCHD is a full node for Bitcoin Cash written in Go.

## Building & Deploying

There are two tools used to build the final docker image:

1. Grunt
1. Rebuild.sh

These tools are biased towards development environments, and the default settings of all scripts assume you are actively developing. When pushing to production you will need to use flags as described below.

### Grunt

The Grunt command runs the following tasks:

1. Concatenate and minify all CSS & JS files
1. Builds the HTML files from our templates
1. Copies all files to a folder called `.build`

### Rebuild.sh

This simple bash script will run the following commands:

1. Stop and remove this Docker image if it exists.
1. Build and run this Docker image exposing port 5000.

### How to Build for Development

1. **Grunt:** Run the command `grunt`
1. **Rebuild.sh:** Run the command `./rebuild.sh`

The grunt script will process and output the files, and will keep watching the `src` folder for changes.

The rebuild script only needs to be run once. It binds the `/usr/share/nginx/html/` folder to your working `.build` folder so you can see the results of any changes immediately.

Here are the commands that are executed by running rebuild.sh:

```
docker stop bchd-web-dev
docker rm bchd-web-dev
docker build . -t bchd-web-dev
docker run -it -p 5000:80 --name bchd-web-dev --mount type=bind,source=/path/to/bchd-web/.build,target=/usr/share/nginx/html/ zquestz/bchd-web-dev
```

### How to Build for Production

1. **Grunt:** Run the command `grunt live`
1. **Rebuild.sh:** Run the command `./rebuild.sh -p`

The grunt script will run the same as in development, but with the following differences:

1. It will erase the `.build` folder before running any other tasks
1. It will not run the watch task

The rebuild script with the -p flag does not mount your local `.build` folder. It will run the following commands:

```
docker stop bchd-web
docker rm bchd-web
docker build . -t bchd-web
docker run -d -p 5000:80 --name bchd-web zquestz/bchd-web
```

### Testing Production Setup Locally

At some point during development, you may want to work locally but with the same settings you would expect on the production server. For example, you may wish to verify that the minified CSS & JS files are working correctly. In that case, run the following grunt command:

```
grunt -env=production
```

This will instruct grunt to use the same settings that it uses for a production environment, but will still run the watch task at the end.

## License

cashshuffle.com is released under the terms of the MIT license. See [LICENSE](LICENSE) for more
information or see https://opensource.org/licenses/MIT.
