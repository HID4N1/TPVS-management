backend:
	@echo "Starting backend"
	@(cd backend && python3 manage.py runserver)

frontend:
	@echo "Starting frontend"
	@(cd frontend && npm start)
	
