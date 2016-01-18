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
}
