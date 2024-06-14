
# Money+ API

A functional and complete system for managing financial expenses. It may be used for personal and small business necessities.


## Running project

#### 1. Requirements Installation

* Install docker
* Install docker-compose
* Install Makefile

#### 2.  Steps to run this project

##### 2.1. Start project in mode development

* It is recommended to create aliases for `docker-compose -f docker-compose.cli.yml run --rm` with `dcli`.
* Copy file `.env.dist` with name `.env`
* Copy file `docker-compose.override.dist.yml` with name `docker-compose.override.yml`

* To start project using docker use the commands

  | COMMAND | DESCRIPTION |
      | ---  | --- |
  | make build  | Build docker |
  | make dev  | Execute application in mode development |

**NOTE:**
* If run in mode `development` set `NODE_ENV=development`
* If run in mode `production` set `NODE_ENV=production`


## 🛠 Skills
Javascript, Typescript, Docker, Express


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


