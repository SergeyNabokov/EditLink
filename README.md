Edit Link Widget
================
Add edit link widget to your page

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist snabokov/yii2-edit-link-widget "*"
```

or add

```
"snabokov/yii2-edit-link-widget": "*"
```

to the require section of your `composer.json` file.


Usage
-----

Once the extension is installed, simply use it in your code by  :

```php
<?= \snabokov\editlink\EditLink::widget(['model' => $model]); ?>