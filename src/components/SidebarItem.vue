<template>
    <li>
        <a v-on:click="go" :class="{disabled:!data.isValid}">{{data.title}}</a>
        <ul v-show="isopen" class="sec-item-ul">
            <sidebarItem v-for="item in data.sub" :data.sync="item" class="sec-item">
            </sidebarItem>
        </ul>
        <span class="iconfont" v-if="data.sub && data.sub.length" v-bind:class="{open:isopen}"
              v-on:click="isopen=!isopen">&#xe6a6;</span>
    </li>
</template>
<style lang="less" scoped rel="stylesheet/less">
    a, li {
        color: #ffffff;
        display: block;
        padding: 4px 0 0px 6px;
        font-size: 14px;
        user-select: none;
        cursor: pointer;
    }

    a.disabled {
        opacity: 0.6;
    }

    li {
        position: relative;

        ul {
            margin: 0px;
        }

        span.iconfont {
            position: absolute;
            right: 14px;
            top: 10px;
            transition: 0.3s ease;
            font-family: iconfont;
            font-weight: 800;
            font-size: 16px;
            font-style: normal;
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
                isopen: false,
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
                    return
                } else if (this.data.isValid) {
                    this.$router.push(this.data.hash)
                }
            }
        }
    }
</script>
