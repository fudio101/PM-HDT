First, run:
```
composer install
```

Next, run:
```
php artisan key:generate
```
Add 2 environment variable:
- OPENSSL_CONF = {apache_path}\conf\openssl.cnf
- SSLEAY_CONF = {apache_path}\conf\openssl.cnf

Next, run:
```
php artisan jwt:secret
php artisan jwt:generate-certs
```

Configure database in .env first and run:
```
php artisan migrate
php artisan db:seed
```
To public local disk, run:
```
php artisan storage:link
```

To use queue, run:
```
php artisan queue:work
```

To update existed records to algolia, run:
```
php artisan scout:import "App\Models\{model}"
```
