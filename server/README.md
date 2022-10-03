First, run
```
composer update
```

Next, run
```
php artisan key:generate
php artisan jwt:secret
php artisan jwt:generate-certs
```

Configure database and run
```
php artisan migrate
php artisan db:seed
```
