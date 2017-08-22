package family.utils

/**
 * Created by Dean on 1/14/2016.
 */
class SharedUtils {
    /**
     * Check if the itemId string is null or empty
     * @param input: The itemId string.
     * @return: True means the itemId string is null or empty. False means NOT.
     */
    static def isNullOrEmpty(input) {
        if (input == null || input.equals(null) || input.toString().trim() == "" || input.toString().trim().equals("")) {
            return true
        } else {
            return false
        }
    }

    /**
     * Converts the parameterMap on controller request to Map.
     * @param requestParameterMap: The instance of request.parameterMap from controller.
     * @return: The map instance.
     */
    static convertRequestParameterToMap(requestParameterMap) {
        def map = [:]

        requestParameterMap.each {
            // Checks if this parameter is a list. If NOT then the first value will be taken.
            // Otherwise the entire list will be taken.
            map.put(it.key, it.value.size() == 1 ? it.value.first() : it.value)
        }

        return map
    }
}
