# Froghop WordPress

## Overview

Local URL: [https://wordpress-inertia-starter.test/](https://wordpress-inertia-starter.test/).

This team uses React, please ensure you have followed all installation steps and built the theme
assets otherwise no content will be displayed.

## Prerequisites

Ensure the following is installed and configured prior to cloning this repository:

1. Install Laravel Valet: [Documentation](https://laravel.com/docs/10.x/valet#installation)
2. PHP 8.2+
3. MySQL 8+

You will also need the Brew license keys for Advanced Custom Fields.

Please read the full [📚Documentation Here](https://brewdigital.atlassian.net/wiki/spaces/BREWD/pages/2344517661/WordPress+-+Project+Setup)

## Installation

1. Clone the repository to your machine and navigate your terminal into the project root.
2. Link the site using Valet: `cd ./public && valet link wordpress-inertia-starter`
3. Ensure requests are served via SSL: `valet secure`
4. Check database credentials in `wp-config.php` to establish local connection
4. Navigate to the desired theme `cd ./wp-content/themes/wordpress-inertia` and install NPM packages: `npm i`
5. Install Composer dependencies: `composer install`
6. Run `npm run dev` or `npm run build` to create theme assets

## Useful Links:

1. [WordPress](https://wordpress.org/documentation/)
2. [Tailwind](https://tailwindcss.com/)
3. [Brew Utilities](https://main.dm55mhmeqnbix.amplifyapp.com/)
