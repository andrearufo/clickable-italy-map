<template>
  <img src="../assets/italia.svg" alt="Italy">
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.italia {
  text-align: center;
  margin-top: $spacer;

  svg {
    height: 400px;

    path {
      fill: $gray-600;
      cursor: pointer;

      &:hover {
        fill: red;
      }
    }
  }
}
</style>
