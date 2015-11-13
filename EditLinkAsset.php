<?php
namespace snabokov\editlink;

use yii\web\AssetBundle;

class EditLinkAsset extends AssetBundle
{    
    public function init()
    {
        $this->sourcePath = __DIR__ . '/assets';
        $this->js = [
            'editLink.js'
        ];
        $this->css = [
            'editLink.css'
        ];
        return parent::init();
    }
    
    public $depends = [
            'yii\web\JqueryAsset'
    ];
    
}