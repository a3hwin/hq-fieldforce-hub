import random
import uuid
from datetime import datetime, date, timedelta
from enum import Enum

from faker import Faker
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Import your SQLAlchemy models and database connection setup
from CRM_TOOL_APIS.models import Base, Department, Employee, TaskType, Task, TaskStatus, TaskPriority

# --- Configuration ---
DATABASE_URL = "mysql+mysqlconnector://user:password@host:port/database"  # Replace with your database URL

# --- Faker Instance ---
fake = Faker()

# --- Helper Functions ---

def clear_data(session):
    """Clears all data from the tables."""
    session.query(Task).delete()
    session.query(TaskType).delete()
    session.query(Employee).delete()
    session.query(Department).delete()
    session.commit()
    print("Cleared existing data.")

def seed_database():
    """Populates the database with dummy data."""
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)  # Ensure tables exist

    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()

    try:
        print("Starting database seeding...")

        # Clear existing data before seeding
        clear_data(session)

        # 1. Seed Task Types
        task_types_data = [
            {"name": "Client Call"},
            {"name": "Site Visit"},
            {"name": "Documentation"},
            {"name": "Internal Meeting"},
            {"name": "Code Review"},
            {"name": "Bug Fix"},
            {"name": "Feature Development"},
            {"name": "Report Generation"},
        ]
        task_types = []
        for data in task_types_data:
            task_type = TaskType(id=uuid.uuid4(), name=data["name"])
            session.add(task_type)
            task_types.append(task_type)
        session.commit()
        print(f"Seeded {len(task_types)} task types.")

        # 2. Seed Departments
        departments_data = [
            {"name": "Sales", "description": "Handles sales activities"},
            {"name": "Marketing", "description": "Manages marketing campaigns"},
            {"name": "Engineering", "description": "Develops and maintains software"},
            {"name": "Human Resources", "description": "Manages employee relations"},
            {"name": "Customer Support", "description": "Provides support to customers"},
        ]
        departments = []
        for data in departments_data:
            department = Department(id=uuid.uuid4(), name=data["name"], description=data["description"])
            session.add(department)
            departments.append(department)
        session.commit()
        print(f"Seeded {len(departments)} departments.")

        # 3. Seed Employees
        employees = []
        roles = list(Employee.role.property.columns[0].type.enums)
        regions = list(Employee.region.property.columns[0].type.enums)
        statuses = list(Employee.status.property.columns[0].type.enums)

        for _ in range(50):  # Seed 50 employees
            department = random.choice(departments)
            employee = Employee(
                id=uuid.uuid4(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                phone=fake.phone_number()[:10], # Truncate to 10 characters
                role=random.choice(roles),
                department_id=department.id,
                region=random.choice(regions),
                status=random.choice(statuses),
                created_at=fake.date_time_this_year(),
                updated_at=fake.date_time_this_year(),
            )
            session.add(employee)
            employees.append(employee)
        session.commit()
        print(f"Seeded {len(employees)} employees.")

        # Update department heads (optional, set some randomly)
        for department in departments:
            head_employee = random.choice(employees)
            department.head_id = head_employee.id
            session.add(department)
        session.commit()
        print("Updated department heads.")


        # 4. Seed Tasks
        statuses = list(TaskStatus)
        priorities = list(TaskPriority)

        for _ in range(100):  # Seed 100 tasks
            assigned_to = random.choice(employees)
            department = session.query(Department).filter(Department.id == assigned_to.department_id).first() # Get department of assigned employee
            task_type = random.choice(task_types)
            status = random.choice(statuses)
            priority = random.choice(priorities)

            deadline = fake.date_object() if random.random() > 0.2 else None # 80% chance of having a deadline
            completed_at = fake.date_time_this_year() if status == TaskStatus.DONE and random.random() > 0.5 else None # 50% chance of completed_at if status is DONE

            task = Task(
                id=uuid.uuid4(),
                title=fake.sentence(nb_words=6),
                description=fake.text(max_nb_chars=200) if random.random() > 0.3 else None, # 70% chance of having a description
                assigned_to=assigned_to.id if random.random() > 0.1 else None, # 90% chance of being assigned
                department_id=department.id,
                type_id=task_type.id if random.random() > 0.05 else None, # 95% chance of having a type
                client_location=fake.address() if random.random() > 0.4 else "Remote Call", # 60% chance of a physical location
                status=status,
                priority=priority,
                deadline=deadline,
                completed_at=completed_at,
                created_at=fake.date_time_this_year(),
                updated_at=fake.date_time_this_year(),
            )
            session.add(task)
        session.commit()
        print(f"Seeded {len(session.query(Task).all())} tasks.")

        print("Database seeding completed successfully.")

    except Exception as e:
        session.rollback()
        print(f"An error occurred during seeding: {e}")
    finally:
        session.close()

# --- Main Execution ---
if __name__ == "__main__":
    seed_database()