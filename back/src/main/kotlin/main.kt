import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main(args: Array<String>) {
    val server = embeddedServer(Netty, port = 5343) {
        routing {
            get("/register") {
                call.respondText("Hello World!", ContentType.Text.Plain)
            }
            get("/length-{uid}") {
                call.respondText("HELLO WORLD!")
            }
            get('/cd-{uid}{cid}') {

            }
            post('/cd-{uid}{cid}') {

            }
            update('/cd-{uid}{cid}') {

            }
            delete('/cd-{uid}{cid}') {

            }
        }
    }
    server.start(wait = true)
}