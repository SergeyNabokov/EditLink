<?php
namespace snabokov\editlink;

use yii\helpers\Json;
use yii\helpers\Url;
use yii\base\InvalidConfigException;

/**
 * EditLink widget.
 * 
 * @author SergeyNabokov
 */
class EditLink extends \Yii\base\Widget
{
    /**
     * @var object \yii\db\ActiveRecord
     */
    public $model;
    
    /**
     * @var array options for the EditLink widget 
     */
    public $options = [];
    
    /**
     * List of available animation modes
     */
    const ANIMATION_SLIDE = 'slide';
    const ANIMATION_FADE = 'fade';
    const ANIMATION_NONE = 'none';
    
    /**
     * @var array list of supported animation mode
     */
    private $_supportedAnimation = [
        self::ANIMATION_FADE,
        self::ANIMATION_NONE,
        self::ANIMATION_SLIDE
    ];
    
    /**
     * Chekcs validity of model and animation options
     */
    public function init()
    {
        parent::init();
        if (empty($this->model) || empty($this->model->id)) {
            throw new InvalidConfigException('Incorrect parameter model');
        }
        if (isset($this->options['animation']) && ! in_array($this->options['animation'], $this->_supportedAnimation)) {
            throw new InvalidConfigException('Unsupported animation mode : ' . $this->options['animation']);
        }
    }
    
    /**
     * @see \yii\base\Widget::run()
     */
    public function run()
    {
        $view = $this->getView();
        EditLinkAsset::register($view);
        
        $primaryKey = array_shift($this->model->tableSchema->primaryKey);
        $path = Json::encode(Url::to(['update', $primaryKey => $this->model->{$primaryKey}]));
        $options = empty($this->options) ? '{}' : Json::encode($this->options);
        
        $js = "$.editLink($path, $options);";
        $view->registerJs($js);
    }
}