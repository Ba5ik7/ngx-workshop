import random
from locust import HttpUser, task, between

class WorkshopAPIUser(HttpUser):
    wait_time = between(1, 5)  # Users will wait between 1 and 5 seconds before executing a new task

    @task(2)  # This decorator defines a task with a weight of 1 (relative to other tasks)
    def get_sections(self):
        self.client.get("/api/navigation/sections")

    @task(1)
    def is_user_logged_in(self):
        self.client.get("/api/authentication/is-user-logged-in")

    @task(3)
    def get_categories(self):
        self.client.get("/api/navigation/categories")

    @task(1)
    def cause_not_found(self):
        self.client.get("/api/404/not-found")