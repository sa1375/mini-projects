FROM python:latest

WORKDIR /app

# فقط نصب dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# سورس کد رو اینجا **کپی نکن** (برای dev)
# COPY . .  ← این خط رو حذف کن

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
