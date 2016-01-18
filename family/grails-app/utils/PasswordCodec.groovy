import org.apache.commons.codec.binary.Base64
import java.security.MessageDigest

class PasswordCodec {

   static encode = { String s ->
      MessageDigest md = MessageDigest.getInstance('SHA')
      md.update s.getBytes('UTF-8')
      Base64.encodeBase64String md.digest()
   }
}