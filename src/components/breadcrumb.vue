<template>
    <ol class="am-breadcrumb">
        <router-link v-for="item in list" tag="li" :to="{path:item.url}"
                     :class="{'am-active':item.active}">
            <a v-if="!item.active">{{item.title}}</a>
            <span v-if="item.active">{{item.title}}</span>
        </router-link>
    </ol>
</template>
<script>
    export default{
        props: ['list']
    }
</script>