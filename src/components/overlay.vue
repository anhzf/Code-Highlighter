<template>
    <div class="overlay" />
</template>

<script>
export default {
    name: 'Overlay',
};
</script>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: #0002;
    backdrop-filter: blur(3px);
}
</style>
