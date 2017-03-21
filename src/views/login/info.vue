<template>
    <div class="am-modal" tabindex="-1" id="login_info">
        <div class="am-modal-dialog">
            <div class="am-modal-bd">
                {{info}}
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        computed: {
            info(){
                let i = this.$store.state.login.info;
                if (i) {
                    $("#login_info").modal("open")
                }
                return i
            }
        }
    }
</script>
