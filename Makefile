prod:
	docker-compose up --build

dev:
	docker-compose -p dev -f dev-compose.yml up --build