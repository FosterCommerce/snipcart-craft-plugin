<?php
/**
 * Snipcart plugin for Craft CMS 3.x
 *
 * @link      https://workingconcept.com
 * @copyright Copyright (c) 2018 Working Concept Inc.
 */

namespace fostercommerce\snipcart\services;

use fostercommerce\snipcart\Snipcart;
use fostercommerce\snipcart\models\snipcart\Discount;
use fostercommerce\snipcart\helpers\ModelHelper;

/**
 * Class Discounts
 *
 * For interacting with Snipcart discounts.
 *
 * @package fostercommerce\snipcart\services
 */
class Discounts extends \craft\base\Component
{
    /**
     * Lists discounts.
     *
     * @return Discount[]
     * @throws \Exception when there isn't an API key to authenticate requests.
     */
    public function listDiscounts(): array
    {
        $response = Snipcart::$plugin->api->get('discounts');

        return ModelHelper::safePopulateArrayWithModels(
            (array)$response,
            Discount::class
        );
    }

    /**
     * Creates a new discount.
     *
     * @param Discount $discount
     *
     * @return mixed $response
     * @throws \Exception when there isn't an API key to authenticate requests.
     */
    public function createDiscount($discount)
    {
        return Snipcart::$plugin->api->post(
            'discounts',
            $discount->getPayloadForPost()
        );
    }

    /**
     * Gets a discount.
     *
     * @param string $discountId
     *
     * @return Discount|null
     * @throws \Exception when there isn't an API key to authenticate requests.
     */
    public function getDiscount($discountId)
    {
        if ($discountData = Snipcart::$plugin->api->get(sprintf(
            'discounts/%s',
            $discountId
        ))) {
            return ModelHelper::safePopulateModel(
                (array)$discountData,
                Discount::class
            );
        }

        return null;
    }

    /**
     * Updates an existing discount.
     *
     * @param Discount $discount
     *
     * @return array|\stdClass
     * @throws \Exception
     */
    public function updateDiscount($discount)
    {
        return Snipcart::$plugin->api->put(
            sprintf(
                'discounts/%s',
                $discount->id
            ),
            $discount->getPayloadForPost(false)
        );
    }

    /**
     * Deletes a discount.
     *
     * @param string $discountId
     *
     * @return mixed
     * @throws \Exception when there isn't an API key to authenticate requests.
     * @todo Handle un-deletable discounts that have been used in orders
     *       https://docs.snipcart.com/v2/api-reference/discounts#delete-discountsid
     */
    public function deleteDiscountById($discountId)
    {
        return Snipcart::$plugin->api->delete(sprintf(
            'discounts/%s',
            $discountId
        ));
    }
}
