<?php
namespace snabokov\editlink;

use yii\web\AssetBundle;

/**
 * Asset bundle for EditLink
 *
 * @author SergeyNabokov
 */
class EditLinkAsset extends AssetBundle
{    
    /**
     * @inheritdoc
     */
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
    
    /**
     * @inheritdoc
     */
    public $depends = [
            'yii\web\JqueryAsset'
    ];
    
}