<template>
  <div>
    <div class="a_banner">
      <p class="a_title">
        {{ $t('bar.tags') }}
        &nbsp;-&nbsp;
        {{ title }}
      </p>
    </div>
    <div class="card-list">
      <el-row :gutter="20" justify="start">
        <el-col
          v-for="(item, index) in data.tagList"
          :key="index"
          :xs="{span:19, offset: 3 }"
          :sm="{span: 12}"
          :md="{span: 10, offset:1}"
          :lg="{span: 8, offset: 0}"
        >
          <CategoryCard :item="item" :loading="data.loading" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { getTagListById } from '@/api/client/tags';
import { ArticleCategoryVO } from '@/api/model/client/category';
import CategoryCard from '@/views/client/categories/components/CategoryCard.vue';
export default defineComponent({
  name:'ArticleTagsList',
  components: { CategoryCard },
  setup() {
    const store = useStore();
    const router = useRouter();
    const title = computed(() => store.getters.getTag );
    const categoryId = computed(() => router.currentRoute.value.params.id as string);
    const data = reactive({
      tagList: [] as ArticleCategoryVO[],
      loading: false,
    });
    const handleInit = () => {
      data.loading = true
      getTagListById(categoryId.value).then(res => {
        data.tagList = res;
      }).finally(() => {
        data.loading = false;
      });
    };
    onMounted(() => {
     handleInit();
    });
    return {
      data,
      title,
    };
  },
});

</script>

<style lang="scss" scoped>
.el-row{
  height: auto;
  overflow: hidden;
  .el-col{
    margin-top: 5px;
    margin-bottom: 15px;
  }
}
.a_banner{
  height: 350px;
  overflow: hidden;
  text-align: center;
  animation: header-effect 1s;
  background: #fff url('@/assets/background/tags.jpeg') no-repeat center/100%;
  .a_title{
    color: #fff;
    display:block;
    justify-content: center;
    margin-top: 200px;
    font-size: 2.2rem;
    font-weight: bold;
  }
}
@media (min-width: 760px) {
  .card-list{
    max-width: 996px;
    margin: 30px auto 1rem auto;
  }
}
</style>
