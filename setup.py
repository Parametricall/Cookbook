from setuptools import find_packages, setup
import os

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as readme:
    README = readme.read()

with open(os.path.join(os.path.dirname(__file__), "VERSION")) as version:
    VERSION = version.readline()

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name="Cookbook",
    version=VERSION,
    license='MIT License',
    author="Alexander Hollis",
    author_email="alexanderhollis96@gmail.com",
    description="Authorisation app for future projects.",
    long_description=README,
    long_description_content_type="text/markdown",
    url="https://github.com/Parametricall/djano_authorisation",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'django>=3.0.2',
        "pillow",
        "django-cors-headers>= 3.2.1",
        "django-heroku>=0.3.1",
        "gunicorn>=20.0.4",
        "whitenoise>=5.0.1",
        "python-dotenv>=0.13.0",
        "dj-database-url>=0.5.0",
        "django-webpack-loader>=0.7.0"
    ],
    classifiers=[
        "Programming Language :: Python",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 3.7',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
    ],
)
