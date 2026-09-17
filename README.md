# SkillTrack

SkillTrack is an equipment inventory project for tracking individual technology assets, such as laptops, monitors, and peripherals. Each physical device will have a unique asset tag (patrimonio), an optional unique serial number, and an associated equipment model and brand.

## Current progress

The project owner has already started coding the initial Django models. Build on this work rather than replacing it with a new project.

- Django project configuration lives in `backend/config/`.
- The `estoque` application is registered in `INSTALLED_APPS`.
- PostgreSQL connection settings are loaded from `backend/.env`.
- `Brand` and `EquipmentModel` are implemented and registered in Django Admin.
- `estoque/migrations/0001_initial.py` creates these two models.
- The only configured URL is `/admin/`.
- The `frontend/` directory exists but is currently empty. React + Vite is planned.
- REST Framework, JWT, CORS, filtering, and API documentation packages are listed in the requirements, but their application configuration and API endpoints are not implemented yet.
- Equipment records, movement history, and project-specific tests are still to be implemented.

## Project structure

```text
skilltrack/
├── backend/
│   ├── config/              # Django settings and root URLs
│   ├── estoque/             # Inventory models, admin, and migrations
│   ├── manage.py
│   └── requirements.txt
├── frontend/                # Planned React + Vite application
└── README.md
```

The application name `estoque` is retained from the initial implementation. Use English for new class names, fields, functions, and code comments.

## Local backend setup

The following commands use Windows PowerShell. The initial environment uses Python 3.14 and the initial migration was generated with Django 6.1.1. Requirements currently do not pin versions, so a fresh installation may resolve different versions.

You need Python, a running PostgreSQL server, and Git for contribution workflows. pgAdmin 4 is optional and provides a graphical interface for inspecting PostgreSQL. Node.js and npm are needed for the future React + Vite frontend, not for running Django.

### 1. Create a contribution branch

In your Git checkout, start from the team's agreed base branch with a clean working tree, then create a branch before making changes:

```powershell
git status
git switch -c feature/equipment-inventory
```

Use a descriptive branch name for your own task. Do not commit directly to the shared main branch. If your project copy has no `.git` directory, obtain the repository URL from the owner and clone the repository first; no remote URL is assumed here.

### 2. Install Python dependencies

From the project root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
```

If the virtual environment already exists, activate it without recreating it. If PowerShell prevents activation, you can run `.\.venv\Scripts\python.exe` directly instead of `python` from the project root.

### 3. Prepare PostgreSQL

For a new local setup, create a login role and a database owned by that role. For example, run the following as a PostgreSQL administrator using psql or pgAdmin with autocommit enabled, outside a transaction:

```sql
CREATE ROLE skilltrack_user WITH LOGIN PASSWORD 'replace-with-a-local-password';
CREATE DATABASE skilltrack_db OWNER skilltrack_user;
```

Skip creation if your local role and database already exist. Use your own credentials in the next step.

### 4. Configure environment variables

Create `backend/.env` with the following values, replacing the placeholders:

```dotenv
SECRET_KEY=replace-with-a-generated-django-secret-key
DEBUG=True
DB_NAME=skilltrack_db
DB_USER=skilltrack_user
DB_PASSWORD=replace-with-a-local-password
DB_HOST=localhost
DB_PORT=5432
```

Generate a development secret key after installing the dependencies:

```powershell
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy the output into `SECRET_KEY`, enclosed in double quotes. Keep `.env` and credentials out of Git. The current settings read these variables directly; `ALLOWED_HOSTS` is currently an empty list in `settings.py`, not an environment variable. With local debug enabled, use `localhost` or `127.0.0.1`.

PostgreSQL is the configured database. The existing `backend/db.sqlite3` file is not used by the current settings.

### 5. Apply the existing migrations

```powershell
cd backend
python manage.py check
python manage.py migrate --plan
python manage.py migrate
python manage.py showmigrations estoque
```

Expect `[X] 0001_initial` after applying the initial migration. A new contributor should apply the committed migrations, not regenerate them just to set up the project.

`check` validates Django configuration; it does not by itself prove database connectivity or successful writes.

### 6. Open the administration interface

```powershell
python manage.py createsuperuser
python manage.py runserver
```

Skip superuser creation if you already have a local administrator account. Open [Django Admin](http://127.0.0.1:8000/admin/), sign in, and create a brand before creating an equipment model associated with it.

The root URL `/` has no application page yet. The development server is for local development only.

## Verify the database flow

1. In Django Admin, create the brand `Dell`, then the model `Latitude 5420` linked to Dell. If they already exist, inspect those records instead.
2. In another terminal with the virtual environment active, enter `backend/` and run:

```powershell
python manage.py shell
```

3. Query the database through Django:

```python
from django.db import connection
from estoque.models import Brand, EquipmentModel

with connection.cursor() as cursor:
    cursor.execute("SELECT current_database(), version()")
    print(cursor.fetchone())

print(Brand.objects.count())
print(list(EquipmentModel.objects.values("name", "brand__name")))
```

In the interactive shell, enter an empty line after the indented block. Use `exit()` to leave the shell.

4. Optionally, open the same database in pgAdmin 4 and execute:

```sql
SELECT
    em.id,
    b.name AS brand,
    em.name AS equipment_model,
    em.created_at
FROM public.estoque_equipmentmodel AS em
JOIN public.estoque_brand AS b ON b.id = em.brand_id;
```

Seeing the record created in Admin confirms basic application-to-database writing and reading. Empty tables before your first registration are normal. These steps are a development smoke check, not a full database health or performance assessment.

## Existing model design

### Brand

Represents a manufacturer, such as Dell or Lenovo.

| Field | Definition |
| --- | --- |
| `id` | Automatically generated primary key |
| `name` | Required text, maximum 100 characters, unique |
| `created_at` | Timestamp automatically set on creation |

### EquipmentModel

Represents a commercial model, such as a Dell Latitude 5420, rather than an individual physical device.

| Field | Definition |
| --- | --- |
| `id` | Automatically generated primary key |
| `name` | Required text, maximum 100 characters |
| `brand` | Required foreign key to `Brand` |
| `created_at` | Timestamp automatically set on creation |

- `PROTECT` prevents deleting a brand while equipment models reference it.
- `related_name="equipment_models"` enables access through `brand.equipment_models.all()`.
- `unique_equipment_model_per_brand` prevents a duplicate combination of brand and model name.
- The `Meta` class holds model options and constraints; it does not create a separate table.
- Current constraints do not explicitly normalize capitalization or whitespace. Consistent name handling remains follow-up work.

## Contributor assignment: backend and Django Admin

**The contributor owns the Django backend and administration interface. The project owner is developing the React + Vite frontend in parallel.** Create a dedicated branch before starting, following the branch instructions above, and build on the initial `Brand` and `EquipmentModel` models already written by the owner.

### First milestone: equipment management through Django Admin

Deliver a working equipment registration and lookup flow before expanding to the API:

1. Add `Category` for equipment types such as laptops, monitors, and printers. Agree with the owner on where the category relationship belongs before generating its migration.
2. Add `Equipment` with a required unique `asset_tag`, an optional unique `serial_number`, a protected relationship to `EquipmentModel`, status, and creation/update timestamps. Read the brand through the equipment model.
3. Support available, in-use, maintenance, and retired statuses. Define identifier normalization and enforce duplicate checks consistently, allowing multiple equipment records without serial numbers.
4. Preserve related data with appropriate deletion protection. Include migrations and meaningful tests for uniqueness, optional serial numbers, and protected relationships.
5. Configure Django Admin for `Brand`, `EquipmentModel`, `Category`, and `Equipment`, with the features below.

| Admin feature | Expected behavior |
| --- | --- |
| List columns | Show asset tag, brand, model, category, and status for equipment |
| Search | Find equipment by asset tag or serial number |
| Filters | Filter by brand, category, and status |
| Organized forms | Group identification, relationships, and tracking information |
| Searchable relationships | Use autocomplete for equipment model selection, with the corresponding related admin search configuration |
| Read-only timestamps | Display creation/update timestamps without allowing manual edits |
| Permission groups | Provide staff access for viewers and inventory editors; viewers cannot create, change, or delete records |

Document how to configure the groups and assign users. Give editors only the permissions required for their work; deletion should not be granted by default.

### First milestone acceptance criteria

- A contributor can set up the backend using this README and apply the committed migrations.
- An authorized administrator can create a brand, a model linked to it, and an equipment category.
- Two equipment records can share a model while having different asset tags.
- Duplicate asset tags and duplicate supplied serial numbers are rejected, including the capitalization and whitespace variations covered by the agreed normalization policy.
- Multiple equipment records can omit the serial number.
- Referenced brands and equipment models cannot be deleted while protected dependent records exist.
- Search, filters, model selection, and read-only timestamps work in Admin.
- A viewer can inspect records but cannot modify them; an editor can perform the intended registration and update operations.
- Records saved through Admin can be read back from PostgreSQL, including their relationships.
- The pull request includes migrations, tests, setup changes, and the commands/results used for validation.

### Second milestone: API for the owner's React frontend

After the Admin flow works, implement authenticated listing, creation, and update endpoints for brands, equipment models, categories, and equipment. Configure REST Framework, permissions, validation, scoped CORS, filtering, and API documentation as needed.

Agree on the API contract with the owner early so frontend work can proceed: endpoint paths, field names, relationship IDs, status values, pagination, authentication, and validation error format. Include example requests and responses in the API documentation. Start the integration with brand listing and creation, then extend it to the other resources.

Keep inventory rules and PostgreSQL access in Django, applying the same rules through Admin and the API. The owner is responsible for React components, the sidebar, dashboard layouts, frontend forms, and consuming these endpoints. Coordinate contract changes before altering fields used by the frontend.

Movement history is a later milestone, after the equipment lifecycle and assignment requirements have been agreed with the owner.

## Shared roadmap toward the inventory goal

These items are planned, not implemented:

1. **Define equipment categories.** Add a `Category` model for types such as laptops and monitors, and decide whether category belongs to the equipment model or individual equipment before creating the migration.
2. **Add `Equipment`.** Each row must represent one physical device. Include a required unique `asset_tag`, an optional unique `serial_number`, a protected foreign key to `EquipmentModel`, status, and creation/update timestamps. Obtain its brand through the equipment model to avoid conflicting brand assignments.
3. **Enforce identifier rules.** Define whitespace and capitalization normalization for asset tags and serial numbers. Allow multiple missing serial numbers while rejecting duplicate supplied serial numbers; do not treat repeated empty strings as actual serial numbers.
4. **Define the equipment lifecycle.** Start with available, in-use, maintenance, and retired states. Preserve historical records rather than deleting equipment with history.
5. **Record movements.** Design a history model referencing the equipment, the responsible user, timestamp, action, and reason. Decide location and assignment requirements with the owner. This is individual asset tracking, not just a product quantity counter.
6. **Expose a Django REST API.** Configure REST Framework, serializers, views, URLs, permissions, and validation. Add authentication, scoped CORS configuration, filtering, and API documentation when those features are implemented. Keep PostgreSQL credentials and database access in Django.
7. **Build the React + Vite frontend.** Start with a sidebar for Dashboard, Equipment, Brands, and Models. Complete brand listing and creation against the API before expanding to other screens. Add loading, empty, validation, and error states.
8. **Test the rules.** Cover duplicate asset identifiers, model uniqueness per brand, protected relationships, optional serial numbers, access permissions, and valid lifecycle transitions.

## Workflow for model changes

After editing models, run from `backend/`:

```powershell
python manage.py check
python manage.py makemigrations estoque
python manage.py migrate --plan
```

Review the generated migration before applying it, especially any rename or deletion operation. Then run:

```powershell
python manage.py migrate
python manage.py makemigrations --check --dry-run
python manage.py test
```

The test file currently contains only the generated scaffold, so a run with zero tests does not validate the business rules. Database tests require a separate test database and appropriate permissions for the local test role.

Commit model changes and their migrations together. Do not delete or rewrite migrations already shared with contributors to resolve a schema change.

## Contribution checklist

- Create a dedicated branch before editing.
- Keep changes focused and preserve the initial `Brand` and `EquipmentModel` work.
- Use English identifiers and explain new setup requirements in this README.
- Add meaningful tests for new business rules and report what you ran.
- Do not commit `.env`, virtual environments, database files, or credentials.
- Before scaffolding the frontend, extend `.gitignore` to exclude `node_modules/` and build output such as `frontend/dist/`; commit the chosen package manager's lockfile.
- Open a pull request describing the purpose, model/API changes, migrations, and validation results.

Before deployment, add environment-specific host/security settings, dependency version pinning, a suitable production server, static-file handling, database backups, and deployment documentation. The current configuration is an initial local development setup.
