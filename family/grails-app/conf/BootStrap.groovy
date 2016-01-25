import family.User

class BootStrap {

    def init = { servletContext ->
        System.setProperty("user.timezone", "Asia/Shanghai");
        TimeZone tz = TimeZone.getTimeZone("Asia/Shanghai");
        TimeZone.setDefault(tz);
    }
    def destroy = {
    }
}
