<?php
/**
 * Snipcart plugin for Craft CMS 3.x
 *
 * @link      https://workingconcept.com
 * @copyright Copyright (c) 2019 Working Concept Inc.
 */

namespace workingconcept\snipcart\helpers;

class VersionHelper
{
    /**
     * Returns true if the current Craft version is 3.1 or greater.
     *
     * @return bool
     */
    public static function isCraft31(): bool
    {
        return version_compare(
            \Craft::$app->getVersion(),
            '3.1',
            '>='
        );
    }

}