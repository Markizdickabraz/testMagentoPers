<?php
namespace Magento\Framework\View\Helper\SecureHtmlRenderer;

/**
 * Proxy class for @see \Magento\Framework\View\Helper\SecureHtmlRenderer
 */
class Proxy extends \Magento\Framework\View\Helper\SecureHtmlRenderer implements \Magento\Framework\ObjectManager\NoninterceptableInterface
{
    /**
     * Object Manager instance
     *
     * @var \Magento\Framework\ObjectManagerInterface
     */
    protected $_objectManager = null;

    /**
     * Proxied instance name
     *
     * @var string
     */
    protected $_instanceName = null;

    /**
     * Proxied instance
     *
     * @var \Magento\Framework\View\Helper\SecureHtmlRenderer
     */
    protected $_subject = null;

    /**
     * Instance shareability flag
     *
     * @var bool
     */
    protected $_isShared = null;

    /**
     * Proxy constructor
     *
     * @param \Magento\Framework\ObjectManagerInterface $objectManager
     * @param string $instanceName
     * @param bool $shared
     */
    public function __construct(\Magento\Framework\ObjectManagerInterface $objectManager, $instanceName = '\\Magento\\Framework\\View\\Helper\\SecureHtmlRenderer', $shared = true)
    {
        $this->_objectManager = $objectManager;
        $this->_instanceName = $instanceName;
        $this->_isShared = $shared;
    }

    /**
     * @return array
     */
    public function __sleep()
    {
        return ['_subject', '_isShared', '_instanceName'];
    }

    /**
     * Retrieve ObjectManager from global scope
     */
    public function __wakeup()
    {
        $this->_objectManager = \Magento\Framework\App\ObjectManager::getInstance();
    }

    /**
     * Clone proxied instance
     */
    public function __clone()
    {
        if ($this->_subject) {
            $this->_subject = clone $this->_getSubject();
        }
    }

    /**
     * Debug proxied instance
     */
    public function __debugInfo()
    {
        return ['i' => $this->_subject];
    }

    /**
     * Get proxied instance
     *
     * @return \Magento\Framework\View\Helper\SecureHtmlRenderer
     */
    protected function _getSubject()
    {
        if (!$this->_subject) {
            $this->_subject = true === $this->_isShared
                ? $this->_objectManager->get($this->_instanceName)
                : $this->_objectManager->create($this->_instanceName);
        }
        return $this->_subject;
    }

    /**
     * {@inheritdoc}
     */
    public function renderTag(string $tagName, array $attributes, ?string $content = null, bool $textContent = true) : string
    {
        return $this->_getSubject()->renderTag($tagName, $attributes, $content, $textContent);
    }

    /**
     * {@inheritdoc}
     */
    public function renderEventListener(string $eventName, string $javascript) : string
    {
        return $this->_getSubject()->renderEventListener($eventName, $javascript);
    }

    /**
     * {@inheritdoc}
     */
    public function renderEventListenerAsTag(string $eventName, string $attributeJavascript, string $elementSelector) : string
    {
        return $this->_getSubject()->renderEventListenerAsTag($eventName, $attributeJavascript, $elementSelector);
    }

    /**
     * {@inheritdoc}
     */
    public function renderStyleAsTag(string $style, string $selector) : string
    {
        return $this->_getSubject()->renderStyleAsTag($style, $selector);
    }
}
