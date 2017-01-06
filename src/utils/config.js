import routes from './routes'
import sidebar from './siderbar'

export default {
    host: "http://localhost:9039",
    routes: routes.routes,
    sidebar: sidebar.sidebar,
    regexp: {
        body: /<body[\s\S]*<\/body>/,
        login: /^$/
    }
}