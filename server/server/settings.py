import os
from pathlib import Path
from dotenv import load_dotenv

SERVER_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = SERVER_DIR.parent

if os.environ.get('IN_DOCKER') is None:
    load_dotenv(SERVER_DIR / '.env')

SECRET_KEY = os.environ.get('SECRET_KEY', os.getenv('SECRET_KEY'))
AUTH_USER_MODEL = 'users.User'

DEBUG = True
CORS_ORIGIN_ALLOW_ALL = True
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:8000',
    'http://localhost:5173'
]

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'users',
    'language',
    'level',
    'material',
    'tests'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'server.urls'

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [SERVER_DIR / 'dist'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('DB_NAME', os.getenv('DB_NAME')),
        'USER': os.environ.get('DB_USER', os.getenv('DB_USER')),
        'PASSWORD': os.environ.get('DB_PASSWORD', os.getenv('DB_PASSWORD')),
        'HOST': os.environ.get('DB_HOST', os.getenv('DB_HOST')),
        'PORT': os.environ.get('DB_PORT', os.getenv('DB_PORT')),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'Ru-ru'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    SERVER_DIR / 'dist/assets/'
]
STATIC_ROOT = BASE_DIR / 'static/'

MEDIA_URL = 'media/'
MEDIA_ROOT = os.environ.get('MEDIA_PATH', SERVER_DIR / 'media/')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
