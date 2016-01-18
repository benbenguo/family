import family.User

class BootStrap {

    def init = { servletContext ->
        System.setProperty("user.timezone", "Asia/Shanghai");
        TimeZone tz = TimeZone.getTimeZone("Asia/Shanghai");
        TimeZone.setDefault(tz);

        if (User.count() == 0) {
            new User(username: "dean", password: "11231008".encodeAsPassword(), name: "Dean").save()
            new User(username: "alice", password: "11231008".encodeAsPassword(), name: "Alice").save()
            new User(username: "family", password: "11231008".encodeAsPassword(), name: "Dean - Alice - Allen").save()
        }
    }
    def destroy = {
    }
}
