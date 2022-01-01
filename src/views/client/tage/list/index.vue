<template>
  <div>
    <div class="a_banner">
      <p class="a_title">
        {{ $t('bar.tags') }}
        &nbsp;-&nbsp;
        {{ data.titleType }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name:'ArticleTagsList',
  setup() {
    const data = reactive({
      titleType: ''
    });
    return {
      data,
    };
  },
});

</script>
