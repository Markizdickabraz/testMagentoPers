<?php
namespace Perspective\Wishlist\Controller\Index;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Wishlist\Model\WishlistFactory;
use Magento\Customer\Model\Session as CustomerSession;
use Magento\Framework\Controller\Result\JsonFactory;

class RemoveAll extends Action
{
    protected $wishlistFactory;
    protected $customerSession;
    protected $resultJsonFactory;

    public function __construct(
        Context $context,
        WishlistFactory $wishlistFactory,
        CustomerSession $customerSession,
        JsonFactory $resultJsonFactory
    ) {
        parent::__construct($context);
        $this->wishlistFactory = $wishlistFactory;
        $this->customerSession = $customerSession;
        $this->resultJsonFactory = $resultJsonFactory;
    }

    public function execute()
    {
        $result = $this->resultJsonFactory->create();
        if (!$this->customerSession->isLoggedIn()) {
            return $result->setData(['error' => true, 'message' => __('Customer is not logged in.')]);
        }

        $customerId = $this->customerSession->getCustomerId();
        $wishlist = $this->wishlistFactory->create()->loadByCustomerId($customerId, true);

        if (!$wishlist) {
            return $result->setData(['error' => true, 'message' => __('Wishlist not found.')]);
        }

        $wishlistItems = $wishlist->getItemCollection();
        foreach ($wishlistItems as $item){
            $item->delete();
        }
        $wishlist->save();

        return $result->setData(['success' => true, 'message' => __('All items removed from wishlist.')]);
    }
}
