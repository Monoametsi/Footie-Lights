# Footie-Lights

A website that displays highlights of football matches from a variety of leagues.

## Start

```shell
docker-compose up
```

## Dev

```shell
docker-compose -p dev -f dev-compose.yml up --build
```

## Makefile

For convenience, you can use the make to run the above commands.

```shell
make        # prod setup 
# or
make dev    # dev setup 
```

## Environment

The node application is looking for the env variable `MONGO_URI`.

```yaml
environment:
    # mongo here refers to the name of the mongo db service
    # as named in the docker-compose file
    MONGO_URI: mongodb://root:rootpassword@mongo/
```