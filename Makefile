# Execute build docker
build:
	docker compose build --pull &&\
	docker compose -f docker-compose.cli.yml build --pull

# Execute application in mode development
start:
	docker compose up

# Install dependencies nodejs
install:
	docker compose -f docker-compose.cli.yml run --rm yarn install

# Execute app
dev: install start

# Format and clean code
lint-format:
	docker compose -f docker-compose.cli.yml run --rm yarn lint:fix &&\
	docker compose -f docker-compose.cli.yml run --rm yarn format:fix
