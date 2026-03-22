import routes from './routes.js';

export const store = Vue.reactive({
    dark: JSON.parse(localStorage.getItem('dark')) || false,
    toggleDark() {
        this.dark = !this.dark;
        localStorage.setItem('dark', JSON.stringify(this.dark));
    },
});

const app = Vue.createApp({
    data() {
        return {
            store,
            flags: {}
        };
    },

    async mounted() {
        const res = await fetch("/data/flags.json");
        this.flags = await res.json();
    },

    methods: {
        getFlag(username) {
            const code = this.flags[username];
            if (!code) return null;

            return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
        }
    }
});

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

app.use(router);
app.mount('#app');
