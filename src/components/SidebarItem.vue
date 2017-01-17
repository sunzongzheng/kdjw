<template>
    <li>
        <a v-on:click="go" :class="{disabled:!data.isValid,active:isActive}">{{data.title}}</a>
        <ul v-show="isopen" class="sec-item-ul">
            <sidebarItem v-for="item in data.sub" :data.sync="item" class="sec-item">
            </sidebarItem>
        </ul>
        <span class="iconfont" v-if="data.sub && data.sub.length" v-bind:class="{open:isopen}">&#xe6a6;</span>
    </li>
</template>
<style lang="less" scoped rel="stylesheet/less">
    a, li {
        position: relative;
        color: #ffffff;
        display: block;
        font-size: 14px;
        user-select: none;
        cursor: pointer;
    }

    a {
        padding: 8px 0 8px 12px;
        background-color: rgba(128, 128, 128, 0);
        transition: all 0.3s;
    }

    .before {
        position: absolute;
        content: ' ';
        background-color: #7cd67f;
        width: 2px;
        transition: all 0.3s;
        left: 0;
    }

    a.active:before {
        .before;
        top: 20%;
        height: 60%;
    }

    a.disabled {
        opacity: 0.6;
    }

    a:hover {
        background-color: rgba(128, 128, 128, 0.49);
    }

    a.active:hover:before {
        .before;
        top: 0;
        height: 100%
    }

    li {
        padding: 0;
        ul {
            margin: 0px;
        }

        span.iconfont {
            position: absolute;
            right: 14px;
            top: 6px;
            transition: 0.3s ease;
            font-family: iconfont;
            font-weight: 800;
            font-size: 16px;
            font-style: normal;
            z-index: -1;
            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
        }

        span.iconfont.open {
            transition: 0.3s ease;
            transform: rotate(180deg);
        }

    }
</style>
<script>
    export default{
        name: 'sidebarItem',
        props: ['data'],
        data(){
            return {
                isopen: false
            }
        },
        created(){
            if (this.$route.path == this.data.hash)
                this.$store.commit("toggleCur_col", this.data.title)
        },
        computed: {
            isActive(){
                return (this.$store.state.cur_col == this.data.title && !this.data.sub)
            }
        },
        mounted(){
            let self = this
            this.$nextTick(function () {
                if (self.$route.path.indexOf(self.data.hash) == 0) {
                    self.isopen = true
                }
            })
        },
        methods: {
            go (){
                if (this.data.sub && this.data.sub.length) {
                    this.isopen = !this.isopen
                } else if (this.data.isValid) {
                    if ($(window).width() < 768)this.$store.commit("toggleSidebar", false)
                    this.$store.commit("toggleCur_col", this.data.title)
                    this.$router.push(this.data.hash)
                }
            }
        }
    }
</script>
