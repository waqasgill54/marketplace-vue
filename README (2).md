
# Market Place (Buy Orders)

The application that will be built here will use Laravel lumen for backend logic implementation and Vue.js to handle all frontend interactivity.It's a simple market place project in which It's a Laravel lumen test project built with a repository design pattern, it's basically a backend API project which describes the display, deletes updates, and adds orders.

# Getting started

## Installation

Clone the repository

    git clone https://github.com/waqasgill54/marketplace-vue.git

Switch to the repo folder

    cd marketplace-vue

Project Setup

    npm install


Compiles and hot-reloads for development

    npm run serve


Compiles and minifies for production

    npm run build

jump to marketplace-vue/src/http-common.js 

    export default axios.create({
    baseURL: "http://marketplace-lumen-URL/api",
    headers: {
    "Content-type": "application/json"
    }
    });
        


 



## Linked Repositories

- [@marketplace-backend](https://github.com/waqasgill54/marketplace-lumen.git)
- [@marketplace-frontend](https://github.com/waqasgill54/marketplace-vue.git)

