<template>
  <div>
    Template
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'Article',
  setup() {
    const router = useRouter();
    const articleId = router.currentRoute.value.params.id;
    const data = reactive({
        commentList: [],
    });
    const handleArticle = () =>{
        // get article api
    };
    return {
      data,
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
