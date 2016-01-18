package family.utils

import org.hibernate.cfg.ImprovedNamingStrategy
import org.hibernate.internal.util.StringHelper

/**
 * Created by Dean on 1/14/2016.
 */
class CustomNamingStrategy extends ImprovedNamingStrategy {

    String classToTableName(String className) {
        "t_" + StringHelper.unqualify(className)
    }
}