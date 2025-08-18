from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum, DateTime, func, Index, Date
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.dialects.mysql import UUID
import uuid
import enum

Base = declarative_base()

class Department(Base):
    __tablename__ = 'departments'

    # For UUID: id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    id = Column(Integer, primary_key=True) # Primary Key, INT for now (see comment above for UUID)
    name = Column(String(100), unique=True, nullable=False) # Department name, unique constraint
    description = Column(Text) # Department description
    # For UUID: head_id = Column(UUID(as_uuid=True), ForeignKey('employees.id'), nullable=True)
    head_id = Column(Integer, ForeignKey('employees.id'), nullable=True) # Foreign Key to employees.id, nullable
    created_at = Column(DateTime(timezone=True), server_default=func.now()) # Timestamp when created
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) # Timestamp when updated

    # Define relationship to Employee (for the head of the department)
    head = relationship("Employee", remote_side=[id])
    # Define relationship to Employees in this department
    employees = relationship("Employee", back_populates="department")
    # Define relationship to Tasks in this department
    tasks = relationship("Task", back_populates="department")

class TaskType(Base):
    __tablename__ = 'task_types'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) # Primary Key, UUID
    name = Column(String(100), unique=True, nullable=False) # Task type name, unique constraint
    description = Column(Text) # Task type description
    created_at = Column(DateTime(timezone=True), server_default=func.now()) # Timestamp when created
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) # Timestamp when updated

    # Define relationship to Tasks of this type
    tasks = relationship("Task", back_populates="task_type")

class Employee(Base):
    __tablename__ = 'employees'

    class EmployeeRole(enum.Enum):
        Manager = "Manager"
        Staff = "Staff"
        Supervisor = "Supervisor"


    # For UUID: id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    id = Column(Integer, primary_key=True) # Primary Key, INT for now (see comment above for UUID)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False) # Email, unique and indexed
    phone = Column(String(10))
    role = Column(Enum('Manager', 'Staff', 'Supervisor', name='employee_role'), nullable=False) # Role, ENUM constraint
    # For UUID: department_id = Column(UUID(as_uuid=True), ForeignKey('departments.id'), nullable=False)
    department_id = Column(Integer, ForeignKey('departments.id'), nullable=False) # Foreign Key to departments.id
    region = Column(Enum('North', 'South', 'East', 'West', name='employee_region'), nullable=False) # Region, ENUM constraint
    status = Column(Enum('Active', 'Leave', 'Resigned', name='employee_status'), nullable=False) # Status, ENUM constraint
    created_at = Column(DateTime(timezone=True), server_default=func.now()) # Timestamp when created
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) # Timestamp when updated

    # Define relationship to Department
    department = relationship("Department", back_populates="employees")
    # Define relationship to Tasks assigned to this employee
    assigned_tasks = relationship("Task", back_populates="assigned_employee")

    # Add index on email for faster lookups
    __table_args__ = (Index('idx_employee_email', 'email'),)
    
class TaskStatus(enum.Enum):
    Pending = "Pending"
    InProgress = "In Progress"
    Completed = "Completed"
    Blocked = "Blocked"

class TaskPriority(enum.Enum):
    Low = "Low"
    Medium = "Medium"
    High = "High"
    Critical = "Critical"

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) # Primary Key, UUID
    title = Column(String(255), nullable=False) # Task title
    description = Column(Text) # Task description (optional)
    client_location = Column(String(255)) # Client location (optional)
    assigned_to = Column(UUID(as_uuid=True), ForeignKey('employees.id', ondelete='SET NULL'), nullable=True) # Foreign Key to employees.id, ON DELETE SET NULL
    department_id = Column(UUID(as_uuid=True), ForeignKey('departments.id', ondelete='SET NULL'), nullable=True) # Foreign Key to departments.id, ON DELETE SET NULL
    type_id = Column(UUID(as_uuid=True), ForeignKey('task_types.id', ondelete='SET NULL'), nullable=True) # Foreign Key to task_types.id, ON DELETE SET NULL
    status = Column(Enum(TaskStatus), nullable=False, default=TaskStatus.Pending) # Status, ENUM constraint, default to Pending
    priority = Column(Enum(TaskPriority), nullable=False, default=TaskPriority.Low) # Priority, ENUM constraint, default to Low
    deadline = Column(Date) # Deadline (optional)
    created_at = Column(DateTime(timezone=True), server_default=func.now()) # Timestamp when created
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) # Timestamp when updated
    completed_at = Column(DateTime(timezone=True), nullable=True) # Timestamp when completed (nullable)


    # Define relationship to the assigned Employee
    assigned_employee = relationship("Employee", back_populates="assigned_tasks")
    # Define relationship to the Department
    department = relationship("Department", back_populates="tasks")
    # Define relationship to the TaskType
    task_type = relationship("TaskType", back_populates="tasks")
