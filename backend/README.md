# Business Universe — Django Backend

REST API backend for the frontend's `src/api.js`. Built with Django + Django REST Framework.

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser   # optional, for /admin/
python manage.py seed_demo         # optional demo content
python manage.py runserver 127.0.0.1:8000
```

The API is now live at `http://127.0.0.1:8000/api/`. Django admin is at `/admin/`.

## Endpoints

Public content (GET is open to everyone; write methods require a token):

| Resource      | Path                  |
|---------------|-----------------------|
| Services      | `/api/services/`      |
| Projects      | `/api/projects/`      |
| Team members  | `/api/team/`          |
| Testimonials  | `/api/testimonials/`  |
| Pricing plans | `/api/pricing/`       |

Each supports standard DRF ModelViewSet routes: `GET /`, `POST /`, `GET /:id/`, `PUT /:id/`, `PATCH /:id/`, `DELETE /:id/`.

Auth (mirrors the signup/login flow already in the frontend's onboarding):

| Method | Path                | Body                              | Notes                          |
|--------|----------------------|------------------------------------|---------------------------------|
| POST   | `/api/auth/signup/`  | full business signup payload      | returns `{ user, token }`      |
| POST   | `/api/auth/login/`   | `{ email, password }`             | returns `{ user, token }`      |
| POST   | `/api/auth/logout/`  | — (send `Authorization: Token …`) | invalidates the token          |
| GET    | `/api/auth/me/`      | — (send `Authorization: Token …`) | current user                   |

Auth uses a simple `Authorization: Token <token>` header (see `core/authentication.py`) —
not Django's built-in User/session auth, since `BusinessUser` mirrors the frontend's
existing signup shape rather than `auth.User`.

## CORS

`CORS_ALLOWED_ORIGINS` in `config/settings.py` is preconfigured for the Vite dev server
(`http://localhost:5173`). Add your production frontend origin there before deploying.

## Notes

- SQLite by default (`db.sqlite3`) — swap `DATABASES` in `config/settings.py` for
  Postgres/MySQL in production.
- `SECRET_KEY` and `DEBUG=True` are dev-only — set real values via environment
  variables before deploying.
