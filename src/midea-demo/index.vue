<template>
    <div class="midea-demo-wrapper">
        <text class="greeting">{{msg}}</text>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg: 'hello, this is midea demo'
        }
    }
}
</script>
<style scoped>
  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
</style>


